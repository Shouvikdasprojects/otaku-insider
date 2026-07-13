import Link from 'next/link'
import { Compass, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-7xl font-bold text-primary">404</p>
      <h1 className="text-2xl font-bold text-balance">This page wandered off the map</h1>
      <p className="text-muted-foreground text-pretty">
        The anime or page you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Back home
        </Link>
        <Link
          href="/browse"
          className="flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
        >
          <Compass className="h-4 w-4" aria-hidden="true" />
          Browse anime
        </Link>
      </div>
    </div>
  )
}
