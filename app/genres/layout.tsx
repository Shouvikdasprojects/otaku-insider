import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anime Genres — Otaku Insider',
  description: 'Explore the best anime by genre: Action, Romance, Fantasy, Sci-Fi, and more.',
}

export default function GenresLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
