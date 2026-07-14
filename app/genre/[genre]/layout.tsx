import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ genre: string }>
}): Promise<Metadata> {
  const { genre } = await params
  const name = decodeURIComponent(genre)
  return {
    title: `Best ${name} Anime — Otaku Insider`,
    description: `The top-rated ${name} anime of all time, ranked by score.`,
  }
}

export default function GenreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
