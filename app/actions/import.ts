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

export interface ImportedEntry {
  animeId: number
  title: string
  coverImage: string | null
  format: string | null
  episodes: number | null
  averageScore: number | null
  status: string
  progress: number
}

export async function saveImportedEntries(entries: ImportedEntry[]) {
  const userId = await getUserId()
  if (!entries || entries.length === 0) return { imported: 0, skipped: 0 }

  const rows = entries.map((e) => ({
    userId,
    animeId: e.animeId,
    title: e.title,
    coverImage: e.coverImage ?? null,
    format: e.format ?? null,
    episodes: e.episodes ?? null,
    averageScore: e.averageScore ?? null,
    status: e.status,
    progress: e.progress ?? 0,
  }))

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
