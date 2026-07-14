'use server'

import { getSessionUser } from '@/lib/auth-helper'
import { db } from '@/lib/db'
import { watchlist } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export type WatchStatus = 'WATCHING' | 'COMPLETED' | 'PLANNING' | 'PAUSED' | 'DROPPED'

async function getUserId() {
  const user = await getSessionUser()
  if (!user) throw new Error('Unauthorized')
  return user.id
}

export async function getWatchlist() {
  const userId = await getUserId()
  return db
    .select()
    .from(watchlist)
    .where(eq(watchlist.userId, userId))
    .orderBy(desc(watchlist.updatedAt))
}

export async function getWatchingEntries() {
  const user = await getSessionUser()
  if (!user) return []
  return db
    .select()
    .from(watchlist)
    .where(and(eq(watchlist.userId, user.id), eq(watchlist.status, 'WATCHING')))
    .orderBy(desc(watchlist.updatedAt))
    .limit(20)
}

export async function getWatchlistEntry(animeId: number) {
  const user = await getSessionUser()
  if (!user) return null
  const rows = await db
    .select()
    .from(watchlist)
    .where(and(eq(watchlist.userId, user.id), eq(watchlist.animeId, animeId)))
    .limit(1)
  return rows[0] ?? null
}

export async function addToWatchlist(input: {
  animeId: number
  title: string
  coverImage?: string | null
  format?: string | null
  episodes?: number | null
  averageScore?: number | null
  status?: WatchStatus
}) {
  const userId = await getUserId()
  await db
    .insert(watchlist)
    .values({
      userId,
      animeId: input.animeId,
      title: input.title,
      coverImage: input.coverImage ?? null,
      format: input.format ?? null,
      episodes: input.episodes ?? null,
      averageScore: input.averageScore ?? null,
      status: input.status ?? 'PLANNING',
    })
    .onConflictDoNothing()
  revalidatePath('/watchlist')
  revalidatePath(`/anime/${input.animeId}`)
}

export async function updateWatchlistStatus(animeId: number, status: WatchStatus) {
  const userId = await getUserId()
  await db
    .update(watchlist)
    .set({ status, updatedAt: new Date() })
    .where(and(eq(watchlist.userId, userId), eq(watchlist.animeId, animeId)))
  revalidatePath('/watchlist')
  revalidatePath(`/anime/${animeId}`)
}

export async function updateWatchlistProgress(animeId: number, progress: number) {
  const userId = await getUserId()
  const safeProgress = Math.max(0, Math.floor(progress))
  await db
    .update(watchlist)
    .set({ progress: safeProgress, updatedAt: new Date() })
    .where(and(eq(watchlist.userId, userId), eq(watchlist.animeId, animeId)))
  revalidatePath('/watchlist')
}

export async function updateWatchlistRating(animeId: number, rating: number | null) {
  const userId = await getUserId()
  const safeRating = rating === null ? null : Math.min(10, Math.max(1, Math.floor(rating)))
  await db
    .update(watchlist)
    .set({ userRating: safeRating, updatedAt: new Date() })
    .where(and(eq(watchlist.userId, userId), eq(watchlist.animeId, animeId)))
  revalidatePath('/watchlist')
}

export async function updateWatchlistNotes(animeId: number, notes: string) {
  const userId = await getUserId()
  await db
    .update(watchlist)
    .set({ notes: notes.trim() || null, updatedAt: new Date() })
    .where(and(eq(watchlist.userId, userId), eq(watchlist.animeId, animeId)))
  revalidatePath('/watchlist')
}

export async function incrementRewatchCount(animeId: number) {
  const userId = await getUserId()
  const rows = await db
    .select({ rewatchCount: watchlist.rewatchCount })
    .from(watchlist)
    .where(and(eq(watchlist.userId, userId), eq(watchlist.animeId, animeId)))
    .limit(1)
  const current = rows[0]?.rewatchCount ?? 0
  await db
    .update(watchlist)
    .set({ rewatchCount: current + 1, updatedAt: new Date() })
    .where(and(eq(watchlist.userId, userId), eq(watchlist.animeId, animeId)))
  revalidatePath('/watchlist')
}

export async function removeFromWatchlist(animeId: number) {
  const userId = await getUserId()
  await db
    .delete(watchlist)
    .where(and(eq(watchlist.userId, userId), eq(watchlist.animeId, animeId)))
  revalidatePath('/watchlist')
  revalidatePath(`/anime/${animeId}`)
}

export async function getUserFavorites() {
  const user = await getSessionUser()
  if (!user) return []
  return db
    .select()
    .from(watchlist)
    .where(
      and(
        eq(watchlist.userId, user.id),
        or(
          gte(watchlist.userRating, 7),
          eq(watchlist.status, 'COMPLETED'),
          eq(watchlist.status, 'WATCHING')
        )
      )
    )
    .limit(5)
}
