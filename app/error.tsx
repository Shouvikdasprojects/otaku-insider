'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to your error tracking service here if needed
    console.error('[OtakuInsider] Page error:', error)
  }, [error])

  const isRateLimit =
    error.message?.toLowerCase().includes('rate') ||
    error.message?.toLowerCase().includes('429') ||
    error.message?.toLowerCase().includes('anilist')

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Animated icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary glow-primary">
          <AlertTriangle
            className="h-10 w-10 text-primary"
            style={{ animation: 'pulse 2s ease-in-out infinite' }}
            aria-hidden="true"
          />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
          {isRateLimit ? 'AniList is a bit busy' : 'Something went wrong'}
        </h1>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          {isRateLimit
            ? 'The AniList API is temporarily rate-limited (it allows ~90 requests/min). Wait a moment and try again.'
            : 'An unexpected error occurred. This is usually temporary — try refreshing the page.'}
        </p>

        {error.digest && (
          <p className="text-xs text-muted-foreground mb-6 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 glow-primary"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
