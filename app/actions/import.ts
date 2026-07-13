'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { watchlist } from '@/lib/db/schema'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

// ── AniList status map ────────────────────────────────────────────────────

const AL_STATUS: Record<string, string> = {
  CURRENT:   'WATCHING',
  COMPLETED: 'COMPLETED',
  PAUSED:    'PAUSED',
  DROPPED:   'DROPPED',
  PLANNING:  'PLANNING',
  REPEATING: 'WATCHING',
}

// ── MAL (Jikan) status map ────────────────────────────────────────────────

const MAL_STATUS: Record<string, string> = {
  watching:       'WATCHING',
  completed:      'COMPLETED',
  on_hold:        'PAUSED',
  dropped:        'DROPPED',
  plan_to_watch:  'PLANNING',
}

// ── AniList import ────────────────────────────────────────────────────────

const AL_LIST_QUERY = `
  query ($name: String!) {
    MediaListCollection(userName: $name, type: ANIME) {
      lists {
        entries {
          status
          progress
          score
          media {
            id
            title { romaji english }
            coverImage { large }
            format
            episodes
            averageScore
          }
        }
      }
    }
  }
`

interface ALEntry {
  status: string
  progress: number
  score: number
  media: {
    id: number
    title: { romaji: string | null; english: string | null }
    coverImage: { large: string | null }
    format: string | null
    episodes: number | null
    averageScore: number | null
  }
}

interface ALResponse {
  MediaListCollection: { lists: { entries: ALEntry[] }[] } | null
}

export async function importFromAniList(username: string) {
  const userId = await getUserId()
  if (!username.trim()) throw new Error('Username required')

  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query: AL_LIST_QUERY, variables: { name: username.trim() } }),
    cache: 'no-store',
  })

  const json = await res.json()
  if (json.errors?.length) {
    throw new Error(json.errors[0].message ?? 'AniList error')
  }

  const data = json.data as ALResponse
  if (!data?.MediaListCollection) throw new Error('User not found or list is private')

  // Flatten all lists
  const entries: ALEntry[] = data.MediaListCollection.lists.flatMap((l) => l.entries)

  if (entries.length === 0) return { imported: 0, skipped: 0 }

  const rows = entries.map((e) => ({
    userId,
    animeId:      e.media.id,
    title:        e.media.title.english ?? e.media.title.romaji ?? 'Unknown',
    coverImage:   e.media.coverImage.large ?? null,
    format:       e.media.format ?? null,
    episodes:     e.media.episodes ?? null,
    averageScore: e.media.averageScore ?? null,
    status:       AL_STATUS[e.status] ?? 'PLANNING',
    progress:     e.progress ?? 0,
  }))

  // Insert in chunks to avoid too-large payloads
  const CHUNK = 50
  let imported = 0
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK)
    const result = await db
      .insert(watchlist)
      .values(chunk)
      .onConflictDoNothing()
    imported += Number(result.rowCount ?? chunk.length)
  }

  revalidatePath('/watchlist')
  revalidatePath('/stats')

  return { imported, skipped: rows.length - imported }
}

// ── MAL import via Jikan v4 ───────────────────────────────────────────────

interface JikanEntry {
  mal_id: number
  title: string
  images?: { jpg?: { large_image_url?: string; image_url?: string } }
  num_episodes?: number
  watching_status?: number
  score?: number
  watched_episodes?: number
}

interface JikanListEntry {
  entry?: JikanEntry
  // Jikan v4 uses snake_case differently for animelist
  mal_id?: number
  title?: string
  images?: { jpg?: { large_image_url?: string; image_url?: string } }
  num_episodes?: number
  score?: number
  status?: string
  num_watched_episodes?: number
  anime_id?: number
  anime_title?: string
  anime_num_episodes?: number
}

// Batch-lookup AniList IDs from MAL IDs
async function malToAniListBatch(
  malEntries: { malId: number; status: string; progress: number; score: number; title: string; cover: string | null; episodes: number | null }[]
): Promise<{ animeId: number; title: string; cover: string | null; format: string | null; episodes: number | null; averageScore: number | null; status: string; progress: number }[]> {
  const CHUNK = 20
  const results: ReturnType<typeof malToAniListBatch> extends Promise<infer T> ? T : never = []

  for (let i = 0; i < malEntries.length; i += CHUNK) {
    const chunk = malEntries.slice(i, i + CHUNK)
    // Build alias query
    const fields = chunk.map(
      (e, j) => `m${j}: Media(idMal: ${e.malId}, type: ANIME) { id title { romaji english } coverImage { large } format episodes averageScore }`
    ).join('\n')

    try {
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ query: `query { ${fields} }` }),
        cache: 'no-store',
      })
      const json = await res.json()
      const data = json.data as Record<string, { id: number; title: { romaji: string | null; english: string | null }; coverImage: { large: string | null }; format: string | null; episodes: number | null; averageScore: number | null } | null>

      chunk.forEach((e, j) => {
        const media = data[`m${j}`]
        if (!media) return
        results.push({
          animeId:      media.id,
          title:        media.title.english ?? media.title.romaji ?? e.title,
          cover:        media.coverImage.large ?? e.cover,
          format:       media.format,
          episodes:     media.episodes ?? e.episodes,
          averageScore: media.averageScore,
          status:       e.status,
          progress:     e.progress,
        })
      })
    } catch {
      // Skip failed chunk — don't abort the whole import
    }

    // Polite delay between chunks
    if (i + CHUNK < malEntries.length) await new Promise((r) => setTimeout(r, 500))
  }

  return results
}

export async function importFromMAL(username: string) {
  const userId = await getUserId()
  if (!username.trim()) throw new Error('Username required')

  // Fetch all statuses from Jikan
  const url = `https://api.jikan.moe/v4/users/${encodeURIComponent(username.trim())}/animelist?status=all&limit=300`
  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    if (res.status === 404) throw new Error('MAL user not found or profile is private')
    throw new Error(`Jikan API error: ${res.status}`)
  }

  const json = await res.json()
  const rawEntries: JikanListEntry[] = json.data ?? []

  if (rawEntries.length === 0) return { imported: 0, skipped: 0 }

  // Normalise Jikan v4 response (field names vary slightly)
  const malEntries = rawEntries.map((e) => {
    const malId    = e.entry?.mal_id ?? e.mal_id ?? e.anime_id ?? 0
    const title    = e.entry?.title ?? e.title ?? e.anime_title ?? 'Unknown'
    const cover    = e.entry?.images?.jpg?.large_image_url
      ?? e.entry?.images?.jpg?.image_url
      ?? e.images?.jpg?.large_image_url
      ?? null
    const episodes = e.entry?.num_episodes ?? e.num_episodes ?? e.anime_num_episodes ?? null
    const rawStatus = typeof e.status === 'string'
      ? e.status
      : typeof e.watching_status === 'number'
        ? ['', 'watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch'][e.watching_status as number] ?? 'plan_to_watch'
        : 'plan_to_watch'
    const status   = MAL_STATUS[rawStatus] ?? 'PLANNING'
    const progress = e.num_watched_episodes ?? e.entry?.watched_episodes ?? 0
    const score    = e.score ?? 0

    return { malId, status, progress, score, title, cover, episodes }
  }).filter((e) => e.malId > 0)

  // Map MAL IDs → AniList IDs (batched)
  const mapped = await malToAniListBatch(malEntries)

  if (mapped.length === 0) return { imported: 0, skipped: rawEntries.length }

  const rows = mapped.map((m) => ({
    userId,
    animeId:      m.animeId,
    title:        m.title,
    coverImage:   m.cover ?? null,
    format:       m.format ?? null,
    episodes:     m.episodes ?? null,
    averageScore: m.averageScore ?? null,
    status:       m.status,
    progress:     m.progress ?? 0,
  }))

  const CHUNK = 50
  let imported = 0
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK)
    await db.insert(watchlist).values(chunk).onConflictDoNothing()
    imported += chunk.length
  }

  revalidatePath('/watchlist')
  revalidatePath('/stats')

  return { imported, skipped: rawEntries.length - imported }
}
