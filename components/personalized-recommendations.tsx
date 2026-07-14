'use client'

import { useState, useEffect } from 'react'
import { MediaRow } from '@/components/media-row'
import { fetchAnimeDetail, type AnimeMedia } from '@/lib/anilist'
import { getUserFavorites } from '@/app/actions/watchlist'

export function PersonalizedRecommendations() {
  const [items, setItems] = useState<AnimeMedia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    
    async function loadRecommendations() {
      try {
        const favorites = await getUserFavorites()
        if (favorites.length === 0) {
          if (mounted) {
            setItems([])
            setLoading(false)
          }
          return
        }

        const sorted = [...favorites].sort((a, b) => (b.userRating ?? 0) - (a.userRating ?? 0))
        const target = sorted[0]

        const details = await fetchAnimeDetail(target.animeId)
        const recs = details.recommendations?.nodes
          ?.map((n) => n.mediaRecommendation)
          .filter((m): m is AnimeMedia => m !== null) ?? []

        if (mounted) {
          setItems(recs.slice(0, 15))
          setLoading(false)
        }
      } catch (err) {
        console.error(err)
        if (mounted) {
          setItems([])
          setLoading(false)
        }
      }
    }

    loadRecommendations()
    return () => { mounted = false }
  }, [])

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-7xl animate-pulse">
        <div className="mb-4 h-8 w-48 rounded-md bg-secondary" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] w-[160px] shrink-0 rounded-xl bg-card" />
          ))}
        </div>
      </div>
    )
  }

  if (items.length === 0) return null

  return (
    <div className="mx-auto w-full max-w-7xl">
      <MediaRow title="Recommended for You" href="/watchlist" items={items} />
    </div>
  )
}
