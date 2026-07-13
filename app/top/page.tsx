export const dynamic = 'force-static'

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Tv } from 'lucide-react'
import { fetchAnimePage, displayTitle, formatStatus } from '@/lib/anilist'
import { PaginationNav } from '@/components/pagination-nav'

export const metadata: Metadata = {
  title: 'Top 100 Anime — Otaku Insider',
  description: 'The highest-rated anime of all time, ranked by score from the AniList community.',
}

export default async function TopPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = Math.min(Math.max(Number(params.page) || 1, 1), 4)
  const { media, pageInfo } = await fetchAnimePage({ sort: ['SCORE_DESC'], page, perPage: 25 })

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-balance">
        Top 100 <span className="text-primary">Anime</span>
      </h1>
      <p className="mt-2 text-muted-foreground">
        The highest-rated series of all time, ranked by community score.
      </p>

      <ol className="mt-8 flex flex-col gap-3">
        {media.map((anime, i) => {
          const rank = (page - 1) * 25 + i + 1
          return (
            <li key={anime.id}>
              <Link
                href={`/anime/${anime.id}`}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-accent"
              >
                <span
                  className={`w-12 shrink-0 text-center text-2xl font-bold tabular-nums ${
                    rank <= 3 ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {rank}
                </span>
                <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={anime.coverImage.large || '/placeholder.svg?height=80&width=56'}
                    alt={displayTitle(anime)}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-semibold group-hover:text-primary">
                    {displayTitle(anime)}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Tv className="h-3.5 w-3.5" aria-hidden="true" />
                      {anime.format ?? '—'}
                      {anime.episodes ? ` · ${anime.episodes} ep` : ''}
                    </span>
                    <span>{formatStatus(anime.status)}</span>
                    <span className="hidden sm:inline">{anime.seasonYear ?? ''}</span>
                  </div>
                  <p className="mt-1 hidden truncate text-sm text-muted-foreground sm:block">
                    {anime.genres.slice(0, 4).join(' · ')}
                  </p>
                </div>
                {anime.averageScore != null && (
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold">
                    <Star className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                    {(anime.averageScore / 10).toFixed(1)}
                  </span>
                )}
              </Link>
            </li>
          )
        })}
      </ol>

      <div className="mt-10">
        <PaginationNav
          currentPage={page}
          lastPage={Math.min(pageInfo.lastPage, 4)}
          basePath="/top"
          params={{}}
        />
      </div>
    </div>
  )
}
