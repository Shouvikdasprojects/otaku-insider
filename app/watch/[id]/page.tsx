

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { WatchPlayer } from '@/components/watch-player'
import { MediaRow } from '@/components/media-row'
import { fetchAnimeDetail, displayTitle, cleanDescription, type AnimeMedia } from '@/lib/anilist'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  try {
    const anime = await fetchAnimeDetail(Number.parseInt(id, 10))
    return { title: `Watch ${displayTitle(anime)} — Otaku Insider` }
  } catch {
    return { title: 'Watch — Otaku Insider' }
  }
}

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const animeId = Number.parseInt(id, 10)
  if (Number.isNaN(animeId)) notFound()

  let anime: AnimeMedia
  try {
    anime = await fetchAnimeDetail(animeId)
  } catch {
    notFound()
  }

  const title = displayTitle(anime)
  const recommendations = (anime.recommendations?.nodes ?? [])
    .map((n) => n.mediaRecommendation)
    .filter((m): m is AnimeMedia => m != null)

  return (
    <div className="flex flex-col gap-12 pb-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pt-8 sm:px-6">
        <Link
          href={`/anime/${anime.id}`}
          className="flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to {title}
        </Link>

        <WatchPlayer
          title={title}
          trailerId={anime.trailer?.site === 'youtube' ? (anime.trailer.id ?? null) : null}
          cover={anime.coverImage.extraLarge || anime.coverImage.large}
          episodes={anime.streamingEpisodes ?? []}
        />

        <p className="max-w-3xl leading-relaxed text-muted-foreground text-pretty">
          {cleanDescription(anime.description, 400)}
        </p>
      </div>

      {recommendations.length > 0 && (
        <div className="mx-auto w-full max-w-7xl">
          <MediaRow title="Up Next For You" items={recommendations} />
        </div>
      )}
    </div>
  )
}
