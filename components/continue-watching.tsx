'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Play, ChevronRight } from 'lucide-react'
import { getWatchingEntries } from '@/app/actions/watchlist'
import type { WatchlistEntry } from '@/lib/db/schema'

// ── Individual card ──────────────────────────────────────────────────────────

function WatchCard({ entry }: { entry: WatchlistEntry }) {
  const pct = entry.episodes && entry.episodes > 0
    ? Math.min(100, Math.round((entry.progress / entry.episodes) * 100))
    : null

  return (
    <Link
      href={`/anime/${entry.animeId}`}
      className="group relative flex w-36 shrink-0 flex-col gap-2 sm:w-40"
    >
      {/* Cover with play overlay */}
      <div className="relative overflow-hidden rounded-xl">
        {entry.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.coverImage}
            alt={entry.title}
            className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-56"
          />
        ) : (
          <div className="h-52 w-full bg-secondary sm:h-56" />
        )}

        {/* Dark gradient + play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
          <div className="flex h-10 w-10 scale-0 items-center justify-center rounded-full bg-primary shadow-lg transition-transform duration-300 group-hover:scale-100">
            <Play className="h-4 w-4 fill-primary-foreground text-primary-foreground" />
          </div>
        </div>

        {/* Episode badge */}
        <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-white backdrop-blur-sm">
          {entry.progress > 0 ? `Ep ${entry.progress}` : 'Not started'}
          {entry.episodes ? `/${entry.episodes}` : ''}
        </div>

        {/* Progress bar */}
        {pct !== null && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </div>

      {/* Title */}
      <p className="line-clamp-2 text-xs font-medium leading-snug text-foreground group-hover:text-primary transition-colors">
        {entry.title}
      </p>
    </Link>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div className="mb-4 h-7 w-48 animate-pulse rounded-lg bg-secondary" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex w-36 shrink-0 flex-col gap-2 sm:w-40">
            <div className="h-52 w-full animate-pulse rounded-xl bg-secondary sm:h-56"
              style={{ animationDelay: `${i * 60}ms` }} />
            <div className="h-3 w-28 animate-pulse rounded bg-secondary/70" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export function ContinueWatching() {
  const [entries, setEntries] = useState<WatchlistEntry[] | null>(null)

  useEffect(() => {
    getWatchingEntries().then(setEntries).catch(() => setEntries([]))
  }, [])

  // Loading
  if (entries === null) return <Skeleton />

  // Not logged in or nothing watching
  if (entries.length === 0) return null

  return (
    <section
      aria-label="Continue Watching"
      className="mx-auto w-full max-w-7xl px-4 sm:px-6"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Continue Watching
          <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/15 px-1.5 text-[10px] font-bold text-primary">
            {entries.length}
          </span>
        </h2>
        <Link
          href="/watchlist?status=WATCHING"
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          View all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Scroll row */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {entries.map((entry) => (
          <WatchCard key={entry.id} entry={entry} />
        ))}

        {/* "Go to Watchlist" end card */}
        <Link
          href="/watchlist"
          className="flex w-36 shrink-0 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-secondary/30 text-center transition-all hover:border-primary/40 hover:bg-secondary/50 sm:w-40"
          style={{ minHeight: '208px' }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">Full Watchlist</span>
        </Link>
      </div>
    </section>
  )
}
