'use client'

import { useState, useEffect, Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { SearchX } from 'lucide-react'
import { AnimeCard } from '@/components/anime-card'
import { PaginationNav } from '@/components/pagination-nav'
import { BrowseFilterBar } from '@/components/browse-filter-bar'
import { fetchAnimePage, fetchGenres, type AnimeMedia, type PageInfo } from '@/lib/anilist'

interface BrowseParams {
  search?: string
  genre?: string
  year?: string
  season?: string
  format?: string
  status?: string
  sort?: string
  page?: string
  minScore?: string
  episodeRange?: string
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

function BrowseResults({ params }: { params: BrowseParams }) {
  const [data, setData] = useState<{ media: AnimeMedia[], pageInfo: PageInfo } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    const page = Math.max(1, Number.parseInt(params.page || '1', 10) || 1)
    const minScore = params.minScore ? Number.parseInt(params.minScore, 10) : undefined
    const epRange = params.episodeRange
    const episodesGreater = epRange === 'medium' ? 12 : epRange === 'long' ? 26 : undefined
    const episodesLesser  = epRange === 'short'  ? 13 : epRange === 'medium' ? 27 : undefined

    fetchAnimePage({
      page,
      perPage: 24,
      search: params.search,
      genre: params.genre,
      seasonYear: params.year ? Number.parseInt(params.year, 10) : undefined,
      season: params.season,
      format: params.format,
      status: params.status,
      sort: params.sort ? [params.sort] : params.search ? ['SEARCH_MATCH'] : ['POPULARITY_DESC'],
      minScore,
      episodesGreater,
      episodesLesser,
    }).then((res) => {
      if (mounted) {
        setData(res)
        setLoading(false)
      }
    }).catch((err) => {
      console.error(err)
      if (mounted) setLoading(false)
    })

    return () => { mounted = false }
  }, [params])

  if (loading) {
    return <GridSkeleton />
  }

  if (!data || data.media.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center">
        <SearchX className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
        <p className="text-lg font-semibold">No anime found</p>
        <p className="text-sm text-muted-foreground">Try a different search or loosen the filters.</p>
      </div>
    )
  }

  const cleanParams: Record<string, string> = {}
  for (const [k, v] of Object.entries(params)) {
    if (v && k !== 'page') cleanParams[k] = v
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data.media.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} className="w-full" />
        ))}
      </div>
      <PaginationNav basePath="/browse" params={cleanParams} currentPage={data.pageInfo.currentPage} lastPage={data.pageInfo.lastPage} />
    </div>
  )
}

function BrowseContent() {
  const searchParams = useSearchParams()
  const [genres, setGenres] = useState<string[]>([])
  
  const params: BrowseParams = useMemo(() => {
    return {
      search: searchParams.get('search') || undefined,
      genre: searchParams.get('genre') || undefined,
      year: searchParams.get('year') || undefined,
      season: searchParams.get('season') || undefined,
      format: searchParams.get('format') || undefined,
      status: searchParams.get('status') || undefined,
      sort: searchParams.get('sort') || undefined,
      page: searchParams.get('page') || undefined,
      minScore: searchParams.get('minScore') || undefined,
      episodeRange: searchParams.get('episodeRange') || undefined,
    }
  }, [searchParams])

  useEffect(() => {
    fetchGenres().then(setGenres).catch(console.error)
  }, [])

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {params.search ? `Results for "${params.search}"` : 'Browse Anime'}
        </h1>
        <p className="text-muted-foreground">
          Search and filter thousands of titles from the AniList catalog.
        </p>
      </div>

      <BrowseFilterBar genres={genres} current={params} />
      <BrowseResults params={params} />
    </div>
  )
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading browse tools...</div>}>
      <BrowseContent />
    </Suspense>
  )
}
