import type { Metadata } from 'next'
import ImportClient from './_client'

export const metadata: Metadata = {
  title: 'Import Watchlist — Otaku Insider',
  description: 'Import your anime watchlist from AniList or MyAnimeList into Otaku Insider in seconds.',
}

export default function ImportPage() {
  return <ImportClient />
}
