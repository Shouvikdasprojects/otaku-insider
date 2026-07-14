'use client'

import { useState, useEffect, Suspense, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AnimeCard } from '@/components/anime-card'
import { PaginationNav } from '@/components/pagination-nav'
import { fetchSeasonal, getCurrentSeason, type AnimeMedia, type PageInfo } from '@/lib/anilist'

const SEASONS = ['WINTER', 'SPRING', 'SUMMER', 'FALL'] as const

function seasonLabel(s: string) {
  return s.charAt(0) + s.slice(1).toLowerCase()
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

function SeasonalGrid({ season, year, page }: { season: string; year: number; page: number }) {
  const [data, setData] = useState<{ media: AnimeMedia[], pageInfo: PageInfo } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchSeasonal(season, year, page, 24).then(res => {
      if (mounted) {
        setData(res)
        setLoading(false)
      }
    }).catch(err => {
      console.error(err)
      if (mounted) setLoading(false)
    })
    return () => { mounted = false }
  }, [season, year, page])

  if (loading) return <GridSkeleton />

  if (!data || data.media.length === 0) {
    return <p className="py-16 text-center text-muted-foreground">No anime found for this season yet.</p>
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data.media.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} className="w-full" />
        ))}
      </div>
      <PaginationNav
        basePath="/seasonal"
        params={{ season, year: String(year) }}
        currentPage={data.pageInfo.currentPage}
        lastPage={data.pageInfo.lastPage}
      />
    </div>
  )
}

function SeasonalContent() {
  const searchParams = useSearchParams()
  
  const current = useMemo(() => getCurrentSeason(), [])
  const paramsSeason = searchParams.get('season')
  const paramsYear = searchParams.get('year')
  const paramsPage = searchParams.get('page')
  
  const season = SEASONS.includes((paramsSeason ?? '') as (typeof SEASONS)[number])
    ? (paramsSeason as string)
    : current.season
  const year = Number.parseInt(paramsYear ?? '', 10) || current.year
  const page = Math.max(1, Number.parseInt(paramsPage ?? '1', 10) || 1)

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

      <SeasonalGrid season={season} year={year} page={page} />
    </div>
  )
}

export default function SeasonalPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading seasonal catalog...</div>}>
      <SeasonalContent />
    </Suspense>
  )
}
