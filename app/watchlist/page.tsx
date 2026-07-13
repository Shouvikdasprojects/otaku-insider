export const runtime = 'edge'

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/auth-helper'
import { getWatchlist } from '@/app/actions/watchlist'
import { WatchlistView } from '@/components/watchlist-view'

export const metadata: Metadata = {
  title: 'My Watchlist — Otaku Insider',
  description: 'Track the anime you are watching, planning, and have completed.',
}

export default async function WatchlistPage() {
  const user = await getSessionUser()
  if (!user) redirect('/sign-in')

  const entries = await getWatchlist()

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">My Watchlist</h1>
      <p className="mt-1 text-muted-foreground">
        Signed in as {user.name || user.email}. Track your progress across every series.
      </p>
      <div className="mt-8">
        <WatchlistView entries={entries} />
      </div>
    </main>
  )
}
