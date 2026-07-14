import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seasonal Anime — Otaku Insider',
  description: 'Explore anime lineups by season and year, from the latest simulcasts to past classics.',
}

export default function SeasonalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
