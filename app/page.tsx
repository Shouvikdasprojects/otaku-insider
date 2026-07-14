'use client'

import { useState, useEffect, Suspense } from 'react'
import { HeroSection } from '@/components/hero-section'
import { MediaRow } from '@/components/media-row'
import { AwardsSpotlight } from '@/components/awards-spotlight'
import { ContinueWatching } from '@/components/continue-watching'
import { RecentlyViewedRow } from '@/components/recently-viewed-row'
import { PersonalizedRecommendations } from '@/components/personalized-recommendations'
import { InstagramFeed } from '@/components/instagram-feed'
import { GenreSpotlight } from '@/components/genre-spotlight'
import { StudioShowcase } from '@/components/studio-showcase'
import { NewsSection } from '@/components/news-section'
import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
  fetchSeasonal,
  getCurrentSeason,
  type AnimeMedia,
} from '@/lib/anilist'

function seasonLabel(season: string) {
  return season.charAt(0) + season.slice(1).toLowerCase()
}

function HomeContent() {
  const [data, setData] = useState<{
    trending: AnimeMedia[];
    popular: AnimeMedia[];
    topRated: AnimeMedia[];
    seasonal: AnimeMedia[];
    season: string;
    year: number;
  } | null>(null)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const { season, year } = getCurrentSeason()
    Promise.all([
      fetchTrending(20),
      fetchPopular(20),
      fetchTopRated(20),
      fetchSeasonal(season, year, 1, 20),
    ]).then(([trending, popular, topRated, seasonalResp]) => {
      if (mounted) {
        setData({ 
          trending, 
          popular, 
          topRated, 
          seasonal: seasonalResp.media, 
          season, 
          year 
        })
      }
    }).catch(err => {
      console.error(err)
      if (mounted) setError(err.message || 'Unknown error occurred')
    })
    return () => { mounted = false }
  }, [])

  if (error) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center py-32 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Data</h2>
        <p className="text-foreground/70">{error}</p>
        <p className="mt-4 text-sm text-foreground/50">Please open the browser console for more details.</p>
      </div>
    )
  }

  if (!data) return <HomeSkeleton />

  const { trending, popular, topRated, seasonal, season, year } = data
  const featuredSlides = trending.slice(0, 10)

  return (
    <>
      {featuredSlides.length > 0 && <HeroSection items={featuredSlides} />}

      {/* Awards spotlight */}
      <Suspense fallback={
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="h-52 animate-pulse rounded-3xl bg-card" />
        </div>
      }>
        <AwardsSpotlight />
      </Suspense>

      {/* Continue Watching — client component, handles its own loading */}
      <ContinueWatching />

      {/* Recently Viewed — localStorage, SSR-safe, self-hides if empty */}
      <RecentlyViewedRow />

      {/* Personalized Recommendations based on database watchlist */}
      <Suspense fallback={null}>
        <PersonalizedRecommendations />
      </Suspense>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 py-12">
        <MediaRow title="Trending Now" href="/browse?sort=TRENDING_DESC" items={trending} ranked />
        <MediaRow
          title={`${seasonLabel(season)} ${year} Season`}
          href="/seasonal"
          items={seasonal}
        />
        <MediaRow title="All-Time Popular" href="/browse?sort=POPULARITY_DESC" items={popular} />
        <MediaRow title="Top Rated" href="/browse?sort=SCORE_DESC" items={topRated} ranked />
      </div>

      <GenreSpotlight />

      <StudioShowcase />

      <NewsSection />

      <InstagramFeed />
    </>
  )
}

function HomeSkeleton() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6">
      <div className="h-[60vh] animate-pulse rounded-2xl bg-card" />
      <div className="h-52 animate-pulse rounded-3xl bg-card" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-col gap-4">
          <div className="h-7 w-56 animate-pulse rounded-md bg-card" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 7 }).map((_, j) => (
              <div key={j} className="h-72 w-44 shrink-0 animate-pulse rounded-xl bg-card" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  )
}
