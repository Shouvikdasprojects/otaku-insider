'use client'

import Link from 'next/link'
import { History, Star, X } from 'lucide-react'
import { useRecentlyViewed } from '@/hooks/use-recently-viewed'

export function RecentlyViewedRow() {
  const { items, clear } = useRecentlyViewed()

  if (items.length === 0) return null

  return (
    <section aria-label="Recently Viewed" className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <History className="h-5 w-5 text-primary" />
          Recently Viewed
        </h2>
        <button
          onClick={clear}
          className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-destructive"
          aria-label="Clear history"
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </button>
      </div>

      {/* Scroll row */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/anime/${item.id}`}
            className="group relative flex w-28 shrink-0 flex-col gap-2"
          >
            <div className="relative overflow-hidden rounded-xl">
              {item.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="h-40 w-full bg-secondary" />
              )}
              {/* Score badge */}
              {item.averageScore != null && (
                <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-yellow-400 backdrop-blur-sm">
                  <Star className="h-2.5 w-2.5 fill-current" />
                  {(item.averageScore / 10).toFixed(1)}
                </div>
              )}
            </div>
            <p className="line-clamp-2 text-[11px] font-medium leading-tight text-muted-foreground group-hover:text-foreground transition-colors">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
