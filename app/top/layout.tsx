import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Top 100 Anime — Otaku Insider',
  description: 'The highest-rated anime of all time, ranked by score from the AniList community.',
}

export default function TopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
