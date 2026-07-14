const ANILIST_API = 'https://graphql.anilist.co'

export interface AnimeMedia {
  id: number
  title: { romaji: string | null; english: string | null; native: string | null }
  coverImage: { extraLarge: string | null; large: string | null; color: string | null }
  bannerImage: string | null
  description: string | null
  averageScore: number | null
  popularity: number | null
  episodes: number | null
  duration: number | null
  genres: string[]
  format: string | null
  season: string | null
  seasonYear: number | null
  status: string | null
  studios?: { nodes: { name: string }[] }
  trailer?: { id: string | null; site: string | null; thumbnail: string | null } | null
  nextAiringEpisode?: { episode: number; airingAt: number } | null
  startDate?: { year: number | null; month: number | null; day: number | null }
  streamingEpisodes?: { title: string | null; thumbnail: string | null; url: string | null; site: string | null }[]
  characters?: {
    edges: {
      role: string
      node: { id: number; name: { full: string }; image: { large: string | null } }
      voiceActors: { id: number; name: { full: string }; image: { large: string | null } }[]
    }[]
  }
  recommendations?: {
    nodes: { mediaRecommendation: AnimeMedia | null }[]
  }
  relations?: {
    edges: { relationType: string; node: AnimeMedia }[]
  }
}

export interface PageInfo {
  total: number
  currentPage: number
  lastPage: number
  hasNextPage: boolean
}

const MEDIA_FIELDS = `
  id
  title { romaji english native }
  coverImage { extraLarge large color }
  bannerImage
  description(asHtml: false)
  averageScore
  popularity
  episodes
  duration
  genres
  format
  season
  seasonYear
  status
  nextAiringEpisode { episode airingAt }
  trailer { id site thumbnail }
`

async function gql<T>(query: string, variables: Record<string, unknown> = {}, revalidate = 3600): Promise<T> {
  const isServer = typeof window === 'undefined'
  
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(isServer && { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }),
    },
    body: JSON.stringify({ query, variables }),
  }
  
  if (isServer) {
    // @ts-ignore
    options.next = { revalidate }
  }

  const res = await fetch(ANILIST_API, options)
  if (!res.ok) {
    throw new Error(`AniList API error: ${res.status} ${res.statusText}`)
  }
  const json = await res.json()
  if (json.errors?.length) {
    throw new Error(`AniList GraphQL error: ${json.errors[0].message}`)
  }
  return json.data as T
}

const PAGE_QUERY = `
  query (
    $page: Int = 1, $perPage: Int = 20, $sort: [MediaSort], $search: String,
    $season: MediaSeason, $seasonYear: Int, $genre: String, $format: MediaFormat, $status: MediaStatus,
    $minScore: Int, $episodesGreater: Int, $episodesLesser: Int
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total currentPage lastPage hasNextPage }
      media(
        type: ANIME, isAdult: false, sort: $sort, search: $search,
        season: $season, seasonYear: $seasonYear, genre: $genre, format: $format, status: $status,
        averageScore_greater: $minScore, episodes_greater: $episodesGreater, episodes_lesser: $episodesLesser
      ) {
        ${MEDIA_FIELDS}
      }
    }
  }
`

export interface BrowseFilters {
  page?: number
  perPage?: number
  sort?: string[]
  search?: string
  season?: string
  seasonYear?: number
  genre?: string
  format?: string
  status?: string
  minScore?: number
  episodesGreater?: number
  episodesLesser?: number
}

export async function fetchAnimePage(filters: BrowseFilters, revalidate = 3600) {
  const data = await gql<{ Page: { pageInfo: PageInfo; media: AnimeMedia[] } }>(
    PAGE_QUERY,
    {
      page: filters.page ?? 1,
      perPage: filters.perPage ?? 20,
      sort: filters.sort ?? ['POPULARITY_DESC'],
      search: filters.search || undefined,
      season: filters.season || undefined,
      seasonYear: filters.seasonYear || undefined,
      genre: filters.genre || undefined,
      format: filters.format || undefined,
      status: filters.status || undefined,
      minScore: filters.minScore || undefined,
      episodesGreater: filters.episodesGreater || undefined,
      episodesLesser: filters.episodesLesser || undefined,
    },
    revalidate,
  )
  return data.Page
}

export async function fetchTrending(perPage = 20) {
  return (await fetchAnimePage({ sort: ['TRENDING_DESC'], perPage }, 1800)).media
}

export async function fetchPopular(perPage = 20) {
  return (await fetchAnimePage({ sort: ['POPULARITY_DESC'], perPage })).media
}

export async function fetchTopRated(perPage = 20) {
  return (await fetchAnimePage({ sort: ['SCORE_DESC'], perPage })).media
}

export async function fetchAiring(perPage = 20) {
  return (await fetchAnimePage({ sort: ['TRENDING_DESC'], status: 'RELEASING', perPage }, 1800)).media
}

export function getCurrentSeason(): { season: string; year: number } {
  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  const season = month <= 3 ? 'WINTER' : month <= 6 ? 'SPRING' : month <= 9 ? 'SUMMER' : 'FALL'
  return { season, year }
}

export async function fetchSeasonal(season: string, year: number, page = 1, perPage = 24) {
  return fetchAnimePage({ season, seasonYear: year, sort: ['POPULARITY_DESC'], page, perPage })
}

export async function fetchTopByGenre(genre: string, page = 1, perPage = 24) {
  return fetchAnimePage({ genre, sort: ['SCORE_DESC'], page, perPage })
}

const DETAIL_QUERY = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      ${MEDIA_FIELDS}
      startDate { year month day }
      studios(isMain: true) { nodes { name } }
      streamingEpisodes { title thumbnail url site }
      characters(sort: ROLE, perPage: 12) {
        edges {
          role
          node { id name { full } image { large } }
          voiceActors(language: JAPANESE, sort: RELEVANCE) { id name { full } image { large } }
        }
      }
      recommendations(sort: RATING_DESC, perPage: 12) {
        nodes {
          mediaRecommendation {
            ${MEDIA_FIELDS}
          }
        }
      }
      relations {
        edges {
          relationType
          node {
            ${MEDIA_FIELDS}
          }
        }
      }
    }
  }
`

export async function fetchAnimeDetail(id: number): Promise<AnimeMedia> {
  const data = await gql<{ Media: AnimeMedia }>(DETAIL_QUERY, { id }, 3600)
  return data.Media
}

export interface AiringScheduleItem {
  id: number
  episode: number
  airingAt: number
  media: AnimeMedia
}

const SCHEDULE_QUERY = `
  query ($start: Int, $end: Int, $page: Int = 1) {
    Page(page: $page, perPage: 50) {
      pageInfo { total currentPage lastPage hasNextPage }
      airingSchedules(airingAt_greater: $start, airingAt_lesser: $end, sort: TIME) {
        id
        episode
        airingAt
        media {
          ${MEDIA_FIELDS}
          isAdult
        }
      }
    }
  }
`

export async function fetchAiringSchedule(startSec: number, endSec: number): Promise<AiringScheduleItem[]> {
  const items: AiringScheduleItem[] = []
  let page = 1
  let hasNext = true
  while (hasNext && page <= 4) {
    const data = await gql<{
      Page: {
        pageInfo: PageInfo
        airingSchedules: (AiringScheduleItem & { media: AnimeMedia & { isAdult?: boolean } })[]
      }
    }>(SCHEDULE_QUERY, { start: startSec, end: endSec, page }, 1800)
    items.push(...data.Page.airingSchedules.filter((s) => s.media && !s.media.isAdult))
    hasNext = data.Page.pageInfo.hasNextPage
    page++
  }
  return items
}

export async function fetchGenres(): Promise<string[]> {
  const data = await gql<{ GenreCollection: string[] }>(`query { GenreCollection }`, {}, 86400)
  return data.GenreCollection.filter((g) => g !== 'Hentai')
}

export function displayTitle(media: AnimeMedia): string {
  return media.title.english || media.title.romaji || media.title.native || 'Unknown'
}

export function cleanDescription(desc: string | null, maxLength = 0): string {
  if (!desc) return 'No description available.'
  let text = desc
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (maxLength > 0 && text.length > maxLength) {
    text = text.slice(0, maxLength).trimEnd() + '…'
  }
  return text
}

export function formatStatus(status: string | null): string {
  if (!status) return 'Unknown'
  const map: Record<string, string> = {
    RELEASING: 'Airing',
    FINISHED: 'Finished',
    NOT_YET_RELEASED: 'Upcoming',
    CANCELLED: 'Cancelled',
    HIATUS: 'Hiatus',
  }
  return map[status] ?? status
}
