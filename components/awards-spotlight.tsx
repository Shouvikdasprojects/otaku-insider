'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trophy, Star, ArrowRight } from 'lucide-react'
import { fetchYearAwards } from '@/lib/anilist-awards'

export function AwardsSpotlight() {
  const [aoty, setAoty] = useState<any>(null)
  
  const currentYear = new Date().getFullYear()   // 2026
  const prevYear    = currentYear - 1            // 2025 — for the "See all awards" link

  useEffect(() => {
    let mounted = true
    fetchYearAwards(currentYear).then(awards => {
      if (mounted) setAoty(awards.overall[0])
    }).catch(console.error)
    return () => { mounted = false }
  }, [currentYear])

  if (!aoty) return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="h-52 animate-pulse rounded-3xl bg-card" />
    </div>
  )

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div className="group relative overflow-hidden rounded-3xl border border-white/[0.06]">
        {/* Banner bg */}
        <div className="absolute inset-0">
          {aoty.bannerImage ? (
            <Image src={aoty.bannerImage} alt="" fill className="object-cover opacity-20" unoptimized />
          ) : (
            <div style={{ background: 'radial-gradient(ellipse at 30% 50%, oklch(0.88 0.11 90 / 18%), transparent 70%)' }} className="h-full w-full" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          {/* Badge */}
          <div className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 backdrop-blur-sm">
            <Trophy className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Best of {currentYear} So Far
            </span>
          </div>

          {/* Cover */}
          <Link href={`/anime/${aoty.id}`} className="shrink-0">
            <div className="relative h-44 w-32 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-[1.02]"
              style={{ boxShadow: '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px oklch(0.88 0.11 90 / 15%)' }}>
              <Image src={aoty.coverImage} alt={aoty.title} fill className="object-cover" unoptimized />
            </div>
          </Link>

          {/* Info */}
          <div className="flex-1 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              🔥 Top Rated Anime of {currentYear}
            </p>
            <Link href={`/anime/${aoty.id}`}>
              <h2 className="text-2xl font-black leading-tight text-foreground transition-colors hover:text-primary sm:text-3xl">
                {aoty.title}
              </h2>
            </Link>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {aoty.averageScore && (
                <span className="flex items-center gap-1.5 text-lg font-black text-primary">
                  <Star className="h-5 w-5 fill-primary" />
                  {(aoty.averageScore / 10).toFixed(1)}
                </span>
              )}
              <span className="text-sm text-muted-foreground">{aoty.genres.slice(0, 3).join(' · ')}</span>
            </div>
            {aoty.description && (
              <p className="line-clamp-2 max-w-lg text-sm text-muted-foreground leading-relaxed">
                {aoty.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Link
                href={`/awards?year=${currentYear}`}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary/20"
              >
                {currentYear} Awards
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/awards?year=${prevYear}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
              >
                {prevYear} Awards →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
