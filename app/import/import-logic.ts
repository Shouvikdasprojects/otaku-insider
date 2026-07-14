import { saveImportedEntries, type ImportedEntry } from '@/app/actions/import'

const AL_STATUS: Record<string, string> = {
  CURRENT:   'WATCHING',
  COMPLETED: 'COMPLETED',
  PAUSED:    'PAUSED',
  DROPPED:   'DROPPED',
  PLANNING:  'PLANNING',
  REPEATING: 'WATCHING',
}

const MAL_STATUS: Record<string, string> = {
  watching:       'WATCHING',
  completed:      'COMPLETED',
  on_hold:        'PAUSED',
  dropped:        'DROPPED',
  plan_to_watch:  'PLANNING',
}

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

export async function importFromAniListClient(username: string) {
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

  const data = json.data
  if (!data?.MediaListCollection) throw new Error('User not found or list is private')

  const entries: ALEntry[] = data.MediaListCollection.lists.flatMap((l: any) => l.entries)
  if (entries.length === 0) return { imported: 0, skipped: 0 }

  const rows: ImportedEntry[] = entries.map((e) => ({
    animeId:      e.media.id,
    title:        e.media.title.english ?? e.media.title.romaji ?? 'Unknown',
    coverImage:   e.media.coverImage.large ?? null,
    format:       e.media.format ?? null,
    episodes:     e.media.episodes ?? null,
    averageScore: e.media.averageScore ?? null,
    status:       AL_STATUS[e.status] ?? 'PLANNING',
    progress:     e.progress ?? 0,
  }))

  return await saveImportedEntries(rows)
}

async function malToAniListBatch(
  malEntries: { malId: number; status: string; progress: number; score: number; title: string; cover: string | null; episodes: number | null }[]
): Promise<ImportedEntry[]> {
  const CHUNK = 20
  const results: ImportedEntry[] = []

  for (let i = 0; i < malEntries.length; i += CHUNK) {
    const chunk = malEntries.slice(i, i + CHUNK)
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
      const data = json.data as Record<string, any> | null

      if (data) {
        chunk.forEach((e, j) => {
          const media = data[`m${j}`]
          if (!media) return
          results.push({
            animeId:      media.id,
            title:        media.title.english ?? media.title.romaji ?? e.title,
            coverImage:   media.coverImage.large ?? e.cover,
            format:       media.format,
            episodes:     media.episodes ?? e.episodes,
            averageScore: media.averageScore,
            status:       e.status,
            progress:     e.progress,
          })
        })
      }
    } catch (err) {
      console.warn('Batch lookup failed for chunk', i, err)
    }

    if (i + CHUNK < malEntries.length) await new Promise((r) => setTimeout(r, 500))
  }

  return results
}

export async function importFromMALClient(username: string) {
  if (!username.trim()) throw new Error('Username required')

  const url = `https://api.jikan.moe/v4/users/${encodeURIComponent(username.trim())}/animelist?status=all&limit=300`
  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    if (res.status === 404) throw new Error('MAL user not found or profile is private')
    throw new Error(`Jikan API error: ${res.status}`)
  }

  const json = await res.json()
  const rawEntries: any[] = json.data ?? []

  if (rawEntries.length === 0) return { imported: 0, skipped: 0 }

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

  const mapped = await malToAniListBatch(malEntries)
  if (mapped.length === 0) return { imported: 0, skipped: rawEntries.length }

  const result = await saveImportedEntries(mapped)
  // Re-adjust skipped count since we might have skipped some MAL IDs that weren't mapped
  return { imported: result.imported, skipped: rawEntries.length - result.imported }
}
