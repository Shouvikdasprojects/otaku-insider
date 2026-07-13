import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { AnimeCard } from '@/components/anime-card'
import { PaginationNav } from '@/components/pagination-nav'
import { fetchSeasonal, getCurrentSeason } from '@/lib/anilist'

export const metadata: Metadata = {
  title: 'Seasonal Anime — Otaku Insider',
  description: 'Explore anime lineups by season and year, from the latest simulcasts to past classics.',
}

const SEASONS = ['WINTER', 'SPRING', 'SUMMER', 'FALL'] as const

function seasonLabel(s: string) {
  return s.charAt(0) + s.slice(1).toLowerCase()
}

async function SeasonalGrid({ season, year, page }: { season: string; year: number; page: number }) {
  const { pageInfo, media } = await fetchSeasonal(season, year, page, 24)

  if (media.length === 0) {
    return <p className="py-16 text-center text-muted-foreground">No anime found for this season yet.</p>
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {media.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} className="w-full" />
        ))}
      </div>
      <PaginationNav
        basePath="/seasonal"
        params={{ season, year: String(year) }}
        currentPage={pageInfo.currentPage}
        lastPage={pageInfo.lastPage}
      />
    </div>
  )
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="aspect-[2/3] w-full animate-pulse rounded-xl bg-card" />
      ))}
    </div>
  )
}

export default async function SeasonalPage({
  searchParams,
}: {
  searchParams: Promise<{ season?: string; year?: string; page?: string }>
}) {
  const params = await searchParams
  const current = getCurrentSeason()
  const season = SEASONS.includes((params.season ?? '') as (typeof SEASONS)[number])
    ? (params.season as string)
    : current.season
  const year = Number.parseInt(params.year ?? '', 10) || current.year
  const page = Math.max(1, Number.parseInt(params.page ?? '1', 10) || 1)

  const years = Array.from({ length: 8 }, (_, i) => current.year + 1 - i)

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {seasonLabel(season)} {year} Anime Season
        </h1>
        <p className="text-muted-foreground">The full lineup for the season, ranked by popularity.</p>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Select season">
          {SEASONS.map((s) => (
            <Link
              key={s}
              href={`/seasonal?season=${s}&year=${year}`}
              aria-current={s === season ? 'page' : undefined}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                s === season
                  ? 'bg-primary text-primary-foreground glow-primary'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              {seasonLabel(s)}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Select year">
          {years.map((y) => (
            <Link
              key={y}
              href={`/seasonal?season=${season}&year=${y}`}
              aria-current={y === year ? 'page' : undefined}
              className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${
                y === year
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {y}
            </Link>
          ))}
        </div>
      </div>

      <Suspense key={`${season}-${year}-${page}`} fallback={<GridSkeleton />}>
        <SeasonalGrid season={season} year={year} page={page} />
      </Suspense>
    </div>
  )
}
