// Client-safe AniList search + trending helper.
// No server-only imports — safe to call from 'use client' components.

export interface SearchSuggestion {
  id: number
  title: string
  englishTitle: string | null
  coverImage: string | null
  format: string | null
  season: string | null
  seasonYear: number | null
  averageScore: number | null
  genres: string[]
  episodes: number | null
}

// ── Queries ────────────────────────────────────────────────────────────────

const SEARCH_QUERY = /* graphql */ `
  query SearchSuggestions($search: String!) {
    Page(perPage: 8) {
      media(search: $search, type: ANIME, sort: SEARCH_MATCH) {
        id
        title { romaji english }
        coverImage { medium }
        format
        season
        seasonYear
        averageScore
        genres
        episodes
      }
    }
  }
`

const TRENDING_QUERY = /* graphql */ `
  query TrendingAnime {
    Page(perPage: 6) {
      media(type: ANIME, sort: TRENDING_DESC, status_in: [RELEASING, FINISHED]) {
        id
        title { romaji english }
        coverImage { medium }
        format
        season
        seasonYear
        averageScore
        genres
        episodes
      }
    }
  }
`

// ── Types ──────────────────────────────────────────────────────────────────

type RawMedia = {
  id: number
  title: { romaji: string; english: string | null }
  coverImage: { medium: string } | null
  format: string | null
  season: string | null
  seasonYear: number | null
  averageScore: number | null
  genres: string[]
  episodes: number | null
}

// ── Helpers ────────────────────────────────────────────────────────────────

function mapMedia(m: RawMedia): SearchSuggestion {
  const romaji = m.title.romaji
  const english = m.title.english
  return {
    id: m.id,
    title: english || romaji,
    // Show original if it differs from the chosen title
    englishTitle: english && english !== romaji ? english : null,
    coverImage: m.coverImage?.medium ?? null,
    format: m.format,
    season: m.season,
    seasonYear: m.seasonYear,
    averageScore: m.averageScore,
    genres: (m.genres ?? []).slice(0, 3),
    episodes: m.episodes,
  }
}

async function anilistFetch(
  query: string,
  variables?: Record<string, unknown>,
): Promise<RawMedia[]> {
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query, variables }),
    })
    if (!res.ok) return []
    const { data } = await res.json()
    return data?.Page?.media ?? []
  } catch {
    return []
  }
}

// ── Public API ─────────────────────────────────────────────────────────────

export async function searchAnime(search: string): Promise<SearchSuggestion[]> {
  if (!search.trim()) return []
  const media = await anilistFetch(SEARCH_QUERY, { search })
  return media.map(mapMedia)
}

export async function getTrending(): Promise<SearchSuggestion[]> {
  const media = await anilistFetch(TRENDING_QUERY)
  return media.map(mapMedia)
}
