import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { fetchGenres } from '@/lib/anilist'

export const metadata: Metadata = {
  title: 'Anime Genres — Otaku Insider',
  description: 'Explore the best anime by genre: Action, Romance, Fantasy, Sci-Fi, and more.',
}

export const revalidate = 86400

export default async function GenresPage() {
  const genres = await fetchGenres()

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Browse by Genre</h1>
        <p className="text-muted-foreground">Find the top-rated anime in every genre.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {genres.map((genre) => (
          <Link
            key={genre}
            href={`/genre/${encodeURIComponent(genre)}`}
            className="card-3d group flex items-center justify-between rounded-2xl border border-border bg-card p-5"
          >
            <span className="text-lg font-semibold">{genre}</span>
            <ArrowRight
              className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
