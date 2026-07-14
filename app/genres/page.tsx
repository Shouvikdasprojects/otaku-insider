'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { fetchGenres } from '@/lib/anilist'

export default function GenresPage() {
  const [genres, setGenres] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchGenres().then(res => {
      if (mounted) {
        setGenres(res)
        setLoading(false)
      }
    }).catch(err => {
      console.error(err)
      if (mounted) setLoading(false)
    })
    return () => { mounted = false }
  }, [])

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Browse by Genre</h1>
        <p className="text-muted-foreground">Find the top-rated anime in every genre.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-card" />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  )
}
