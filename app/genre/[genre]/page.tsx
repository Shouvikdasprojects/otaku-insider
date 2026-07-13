import { Suspense } from 'react'
import type { Metadata } from 'next'
import { AnimeCard } from '@/components/anime-card'
import { PaginationNav } from '@/components/pagination-nav'
import { fetchTopByGenre } from '@/lib/anilist'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ genre: string }>
}): Promise<Metadata> {
  const { genre } = await params
  const name = decodeURIComponent(genre)
  return {
    title: `Best ${name} Anime — Otaku Insider`,
    description: `The top-rated ${name} anime of all time, ranked by score.`,
  }
}

async function GenreGrid({ genre, page }: { genre: string; page: number }) {
  const { pageInfo, media } = await fetchTopByGenre(genre, page, 24)

  if (media.length === 0) {
    return <p className="py-16 text-center text-muted-foreground">No anime found for this genre.</p>
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {media.map((anime, i) => (
          <AnimeCard key={anime.id} anime={anime} className="w-full" rank={(page - 1) * 24 + i + 1} />
        ))}
      </div>
      <PaginationNav
        basePath={`/genre/${encodeURIComponent(genre)}`}
        params={{}}
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

export default async function GenrePage({
  params,
  searchParams,
}: {
  params: Promise<{ genre: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const [{ genre }, sp] = await Promise.all([params, searchParams])
  const name = decodeURIComponent(genre)
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1)

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Best <span className="text-primary">{name}</span> Anime
        </h1>
        <p className="text-muted-foreground">The highest-rated {name.toLowerCase()} anime, ranked by score.</p>
      </div>

      <Suspense key={`${name}-${page}`} fallback={<GridSkeleton />}>
        <GenreGrid genre={name} page={page} />
      </Suspense>
    </div>
  )
}
