'use client'

import { useState, useEffect, Suspense, use } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimeCard } from '@/components/anime-card'
import { PaginationNav } from '@/components/pagination-nav'
import { fetchTopByGenre, type AnimeMedia, type PageInfo } from '@/lib/anilist'

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="aspect-[2/3] w-full animate-pulse rounded-xl bg-card" />
      ))}
    </div>
  )
}

function GenreGrid({ genre, page }: { genre: string; page: number }) {
  const [data, setData] = useState<{ media: AnimeMedia[], pageInfo: PageInfo } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchTopByGenre(genre, page, 24).then(res => {
      if (mounted) {
        setData(res)
        setLoading(false)
      }
    }).catch(err => {
      console.error(err)
      if (mounted) setLoading(false)
    })
    return () => { mounted = false }
  }, [genre, page])

  if (loading) return <GridSkeleton />

  if (!data || data.media.length === 0) {
    return <p className="py-16 text-center text-muted-foreground">No anime found for this genre.</p>
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data.media.map((anime, i) => (
          <AnimeCard key={anime.id} anime={anime} className="w-full" rank={(page - 1) * 24 + i + 1} />
        ))}
      </div>
      <PaginationNav
        basePath={`/genre/${encodeURIComponent(genre)}`}
        params={{}}
        currentPage={data.pageInfo.currentPage}
        lastPage={data.pageInfo.lastPage}
      />
    </div>
  )
}

function GenreContent({ genreParam }: { genreParam: string }) {
  const searchParams = useSearchParams()
  const name = decodeURIComponent(genreParam)
  const page = Math.max(1, Number.parseInt(searchParams.get('page') ?? '1', 10) || 1)

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Best <span className="text-primary">{name}</span> Anime
        </h1>
        <p className="text-muted-foreground">The highest-rated {name.toLowerCase()} anime, ranked by score.</p>
      </div>

      <GenreGrid genre={name} page={page} />
    </div>
  )
}

export default function GenrePage({
  params,
}: {
  params: Promise<{ genre: string }>
}) {
  const { genre } = use(params)
  
  return (
    <Suspense fallback={
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="h-24 animate-pulse rounded-2xl bg-card" />
        <GridSkeleton />
      </div>
    }>
      <GenreContent genreParam={genre} />
    </Suspense>
  )
}
