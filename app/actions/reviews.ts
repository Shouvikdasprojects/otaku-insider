'use server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { review } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user
}

export async function getReviews(animeId: number) {
  return db.select().from(review).where(eq(review.animeId, animeId)).orderBy(desc(review.createdAt))
}

export async function getUserReview(animeId: number) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return null
  const rows = await db.select().from(review).where(and(eq(review.userId, session.user.id), eq(review.animeId, animeId))).limit(1)
  return rows[0] ?? null
}

export async function upsertReview(input: { animeId: number; animeTitle: string; animeCover: string | null; rating: number; content: string }) {
  const user = await getUser()
  if (input.rating < 1 || input.rating > 10) throw new Error('Rating must be 1-10')
  if (input.content.trim().length < 20) throw new Error('Review must be at least 20 characters')
  await db.insert(review).values({
    userId: user.id,
    userName: user.name || user.email || 'Anonymous',
    animeId: input.animeId,
    animeTitle: input.animeTitle,
    animeCover: input.animeCover,
    rating: input.rating,
    content: input.content.trim(),
  }).onConflictDoUpdate({
    target: [review.userId, review.animeId],
    set: { rating: input.rating, content: input.content.trim(), updatedAt: new Date() },
  })
  revalidatePath(`/anime/${input.animeId}`)
}

export async function deleteReview(animeId: number) {
  const user = await getUser()
  await db.delete(review).where(and(eq(review.userId, user.id), eq(review.animeId, animeId)))
  revalidatePath(`/anime/${animeId}`)
}
