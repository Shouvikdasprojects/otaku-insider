'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Play, Info, Star, Flame, ChevronLeft, ChevronRight } from '@/components/icons'
import { cleanDescription, displayTitle, formatStatus, type AnimeMedia } from '@/lib/anilist'

export function HeroSection({ items }: { items: AnimeMedia[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (items.length <= 1) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, 6000) // Slide every 6 seconds
    return () => clearInterval(timer)
  }, [items])

  if (!items || items.length === 0) return null

  const current = items[index]
  const title = displayTitle(current)
  const banner = current.bannerImage || current.coverImage.extraLarge

  return (
    <section className="relative overflow-hidden min-h-[70vh] flex flex-col justify-center" aria-label="Featured anime slideshow">
      {/* Slides (Fade transition wrapper) */}
      <div className="absolute inset-0 z-0">
        {items.map((item, idx) => {
          const itemBanner = item.bannerImage || item.coverImage.extraLarge
          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === index ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              {itemBanner && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={itemBanner}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover opacity-65"
                />
              )}
            </div>
          )
        })}
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      {/* Main Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:max-w-none lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-0 z-20">
        <div className="flex max-w-2xl flex-col gap-5 animate-in fade-in slide-in-from-left-5 duration-700" key={current.id}>
          <span className="flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <Flame className="h-3.5 w-3.5 text-primary fill-primary animate-pulse" aria-hidden="true" />
            #{idxToRanking(index)} Trending Now
          </span>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl min-h-[2.5em] lg:min-h-0">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {current.averageScore != null && (
              <span className="flex items-center gap-1 font-semibold text-foreground">
                <Star className="h-4 w-4 fill-chart-3 text-chart-3" aria-hidden="true" />
                {(current.averageScore / 10).toFixed(1)}
              </span>
            )}
            <span>{formatStatus(current.status)}</span>
            {current.episodes && <span>{current.episodes} episodes</span>}
            {current.seasonYear && <span>{current.seasonYear}</span>}
            <span className="flex flex-wrap gap-2">
              {current.genres.slice(0, 3).map((g) => (
                <Link
                  key={g}
                  href={`/genre/${encodeURIComponent(g)}`}
                  className="rounded-full bg-secondary px-3 py-0.5 text-xs text-secondary-foreground transition-colors hover:bg-accent"
                >
                  {g}
                </Link>
              ))}
            </span>
          </div>

          <p className="max-w-xl leading-relaxed text-muted-foreground text-pretty line-clamp-3 md:line-clamp-none min-h-[4.5em] md:min-h-0">
            {cleanDescription(current.description, 240)}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={`/watch/${current.id}`}
              className="glow-primary flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Watch Now
            </Link>
            <Link
              href={`/anime/${current.id}`}
              className="flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-7 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-accent"
            >
              <Info className="h-4 w-4" aria-hidden="true" />
              More Details
            </Link>
          </div>
        </div>
      </div>

      {/* Manual Slide Controls and Indicators */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-4">
        {/* Indicators */}
        <div className="hidden sm:flex gap-1.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === index ? 'w-6 bg-primary' : 'w-1.5 bg-muted hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIndex((prev) => (prev - 1 + items.length) % items.length)}
            aria-label="Previous slide"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary/60 text-foreground backdrop-blur transition-colors hover:bg-accent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % items.length)}
            aria-label="Next slide"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary/60 text-foreground backdrop-blur transition-colors hover:bg-accent"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

function idxToRanking(idx: number) {
  return idx + 1
}
