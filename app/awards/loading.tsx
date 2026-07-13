import { Trophy, Medal } from 'lucide-react'

export default function AwardsLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <div
        className="border-b border-white/[0.06] py-16 sm:py-24 text-center"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.88 0.11 90 / 8%), transparent)' }}
      >
        <div className="mx-auto mb-6 h-20 w-20 animate-pulse rounded-full bg-secondary" />
        <div className="mx-auto mb-3 h-4 w-48 animate-pulse rounded-full bg-secondary" />
        <div className="mx-auto mb-2 h-14 w-72 animate-pulse rounded-2xl bg-secondary" />
        <div className="mx-auto h-12 w-48 animate-pulse rounded-2xl bg-secondary/60" />

        {/* Year pills */}
        <div className="mt-10 flex justify-center gap-2 flex-wrap max-w-lg mx-auto px-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-7 w-14 animate-pulse rounded-full bg-secondary" style={{ animationDelay: `${i * 40}ms` }} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 space-y-14">
        {/* AOTY skeleton */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <Trophy className="h-5 w-5 text-primary/40" />
            <div className="h-3 w-36 animate-pulse rounded bg-secondary" />
          </div>
          <div className="h-60 w-full animate-pulse rounded-3xl bg-secondary" />
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[0, 1].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-xl bg-secondary" style={{ animationDelay: `${i * 80}ms` }} />
            ))}
          </div>
        </section>

        {/* Category grid skeleton */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <Medal className="h-5 w-5 text-primary/40" />
            <div className="h-3 w-32 animate-pulse rounded bg-secondary" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl bg-secondary"
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
