import { db } from '@/lib/db'
import { watchlist } from '@/lib/db/schema'
import { eq, and, gte, or } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { MediaRow } from '@/components/media-row'
import { fetchPopular, fetchAnimeDetail, type AnimeMedia } from '@/lib/anilist'

async function getRecommendedMedia(): Promise<AnimeMedia[]> {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) return []

    // Fetch user's favorite/highly rated completed or watching shows
    const favorites = await db
      .select()
      .from(watchlist)
      .where(
        and(
          eq(watchlist.userId, session.user.id),
          or(
            gte(watchlist.userRating, 7),
            eq(watchlist.status, 'COMPLETED'),
            eq(watchlist.status, 'WATCHING')
          )
        )
      )
      .limit(5)

    if (favorites.length === 0) return []

    // Fetch recommendations for the highest rated one
    // Sort by rating or updatedAt desc
    const sorted = [...favorites].sort((a, b) => (b.userRating ?? 0) - (a.userRating ?? 0))
    const target = sorted[0]

    // Fetch recommendations from AniList detail query
    const details = await fetchAnimeDetail(target.animeId)
    const recs = details.recommendations?.nodes
      ?.map((n) => n.mediaRecommendation)
      .filter((m): m is AnimeMedia => m !== null) ?? []

    return recs.slice(0, 15)
  } catch {
    return []
  }
}

export async function PersonalizedRecommendations() {
  const items = await getRecommendedMedia()
  if (items.length === 0) return null

  return (
    <div className="mx-auto w-full max-w-7xl">
      <MediaRow title="Recommended for You" href="/watchlist" items={items} />
    </div>
  )
}
