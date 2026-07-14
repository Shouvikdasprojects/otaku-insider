import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { getSessionUser } from '@/lib/auth-helper'
import { getWatchlistEntry } from '@/app/actions/watchlist'
import { getReviews, getUserReview } from '@/app/actions/reviews'
import AnimeDetailClient from './client-page'

export const metadata: Metadata = {
  title: 'Anime Details — Otaku Insider',
}

export default async function AnimeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const animeId = Number.parseInt(id, 10)
  if (Number.isNaN(animeId)) notFound()

  const [entry, user, reviews, userReview] = await Promise.all([
    getWatchlistEntry(animeId),
    getSessionUser(),
    getReviews(animeId),
    getUserReview(animeId),
  ])

  return (
    <AnimeDetailClient 
      animeId={animeId}
      entry={entry}
      user={user}
      reviews={reviews}
      userReview={userReview}
    />
  )
}
