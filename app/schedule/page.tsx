import type { Metadata } from 'next'
import { ScheduleView } from '@/components/schedule-view'
import { fetchAiringSchedule } from '@/lib/anilist'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Airing Schedule | Otaku Insider',
  description: 'Weekly anime airing schedule. See exactly when new episodes drop, in your local time.',
}

export default function SchedulePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-balance">Airing Schedule</h1>
        <p className="text-muted-foreground">
          New episodes airing over the next 7 days, shown in your local time.
        </p>
      </div>
      <ScheduleView />
    </div>
  )
}
