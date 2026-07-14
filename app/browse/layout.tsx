import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse Anime — Otaku Insider',
  description: 'Search and filter thousands of anime by genre, year, season, format, and status.',
}

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
