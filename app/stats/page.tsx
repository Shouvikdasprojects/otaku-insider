import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/auth-helper'
import { db } from '@/lib/db'
import { watchlist } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { StatsView } from '@/components/stats-view'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Stats — Otaku Insider',
  description: 'Your personal anime watching statistics, genre breakdown, and rating history.',
}

export default async function StatsPage() {
  const user = await getSessionUser()
  if (!user) redirect('/sign-in')

  const entries = await db
    .select()
    .from(watchlist)
    .where(eq(watchlist.userId, user.id))

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Stats</h1>
        <p className="mt-1 text-muted-foreground">
          A deep look at your anime journey so far.
        </p>
      </div>
      <StatsView entries={entries} />
    </div>
  )
}
