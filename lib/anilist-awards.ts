import { displayTitle, cleanDescription } from '@/lib/anilist'

const ANILIST_API = 'https://graphql.anilist.co'

// ── Types ──────────────────────────────────────────────────────────────────

export interface AwardAnime {
  id: number
  title: string
  englishTitle: string | null
  coverImage: string
  bannerImage: string | null
  averageScore: number | null
  genres: string[]
  episodes: number | null
  format: string | null
  description: string | null
}

export interface YearAwards {
  year: number
  overall: AwardAnime[]     // top 3 — [0] = AOTY winner
  action: AwardAnime | null
  romance: AwardAnime | null
  fantasy: AwardAnime | null
  comedy: AwardAnime | null
  drama: AwardAnime | null
  psychological: AwardAnime | null
  movie: AwardAnime | null
  scifi: AwardAnime | null
  sliceOfLife: AwardAnime | null
  horror: AwardAnime | null
  supernatural: AwardAnime | null
  adventure: AwardAnime | null
}

// ── GraphQL ────────────────────────────────────────────────────────────────

const FIELDS = `
  id
  title { romaji english }
  coverImage { extraLarge large }
  bannerImage
  description(asHtml: false)
  averageScore
  genres
  episodes
  format
`

// One batched request — all categories as GraphQL aliases
const AWARDS_QUERY = `
  query YearlyAwards($year: Int!) {
    overall: Page(perPage: 3) {
      media(type: ANIME, seasonYear: $year, sort: SCORE_DESC, format_in: [TV, ONA], isAdult: false, averageScore_greater: 1) {
        ${FIELDS}
      }
    }
    action: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Action", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${FIELDS}
      }
    }
    romance: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Romance", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${FIELDS}
      }
    }
    fantasy: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Fantasy", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${FIELDS}
      }
    }
    comedy: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Comedy", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${FIELDS}
      }
    }
    drama: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Drama", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${FIELDS}
      }
    }
    psychological: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Psychological", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT, MOVIE], isAdult: false) {
        ${FIELDS}
      }
    }
    movie: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, sort: SCORE_DESC, format_in: [MOVIE], isAdult: false) {
        ${FIELDS}
      }
    }
    scifi: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Sci-Fi", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT, MOVIE], isAdult: false) {
        ${FIELDS}
      }
    }
    sliceoflife: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Slice of Life", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${FIELDS}
      }
    }
    horror: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Horror", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT, MOVIE], isAdult: false) {
        ${FIELDS}
      }
    }
    supernatural: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Supernatural", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${FIELDS}
      }
    }
    adventure: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Adventure", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${FIELDS}
      }
    }
  }
`

// ── Raw types from the API ─────────────────────────────────────────────────

type RawMedia = {
  id: number
  title: { romaji: string; english: string | null }
  coverImage: { extraLarge: string | null; large: string | null }
  bannerImage: string | null
  description: string | null
  averageScore: number | null
  genres: string[]
  episodes: number | null
  format: string | null
}

type AwardsResponse = {
  overall: { media: RawMedia[] }
  action: { media: RawMedia[] }
  romance: { media: RawMedia[] }
  fantasy: { media: RawMedia[] }
  comedy: { media: RawMedia[] }
  drama: { media: RawMedia[] }
  psychological: { media: RawMedia[] }
  movie: { media: RawMedia[] }
  scifi: { media: RawMedia[] }
  sliceoflife: { media: RawMedia[] }
  horror: { media: RawMedia[] }
  supernatural: { media: RawMedia[] }
  adventure: { media: RawMedia[] }
}

// ── Mapping ────────────────────────────────────────────────────────────────

function mapMedia(m: RawMedia): AwardAnime {
  const romaji = m.title.romaji
  const english = m.title.english
  return {
    id: m.id,
    title: english || romaji,
    englishTitle: english && english !== romaji ? english : null,
    coverImage: m.coverImage.extraLarge || m.coverImage.large || '',
    bannerImage: m.bannerImage,
    averageScore: m.averageScore,
    genres: m.genres ?? [],
    episodes: m.episodes,
    format: m.format,
    description: cleanDescription(m.description, 220),
  }
}

function first(arr: RawMedia[]): AwardAnime | null {
  return arr.length > 0 ? mapMedia(arr[0]) : null
}

// ── Public API ─────────────────────────────────────────────────────────────

export async function fetchYearAwards(year: number): Promise<YearAwards> {
  const res = await fetch(ANILIST_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'User-Agent': 'OtakuInsider/1.0 (https://github.com/Shouvikdasprojects)' },
    body: JSON.stringify({ query: AWARDS_QUERY, variables: { year } }),
    next: { revalidate: 60 * 60 * 6 }, // revalidate every 6h
  })

  if (!res.ok) throw new Error(`AniList error: ${res.status}`)
  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors[0].message)

  const d: AwardsResponse = json.data

  return {
    year,
    overall: d.overall.media.slice(0, 3).map(mapMedia),
    action: first(d.action.media),
    romance: first(d.romance.media),
    fantasy: first(d.fantasy.media),
    comedy: first(d.comedy.media),
    drama: first(d.drama.media),
    psychological: first(d.psychological.media),
    movie: first(d.movie.media),
    scifi: first(d.scifi.media),
    sliceOfLife: first(d.sliceoflife.media),
    horror: first(d.horror.media),
    supernatural: first(d.supernatural.media),
    adventure: first(d.adventure.media),
  }
}

// Convenience: available award years
export const AWARD_YEARS = Array.from(
  { length: new Date().getFullYear() - 2013 },
  (_, i) => new Date().getFullYear() - i,
)
