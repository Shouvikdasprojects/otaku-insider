'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

// global-error.tsx replaces the entire root layout when it fires,
// so it must include its own <html> and <body> tags.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[OtakuInsider] Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#141310',
          color: '#f5f0e8',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '1rem',
        }}
      >
        <div style={{ maxWidth: 400 }}>
          <div
            style={{
              margin: '0 auto 1.5rem',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: '#1e1c19',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 24px rgba(220,180,90,0.35)',
            }}
          >
            <AlertTriangle
              style={{ width: 40, height: 40, color: '#dcb45a' }}
              aria-hidden="true"
            />
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Critical Error
          </h1>
          <p style={{ color: '#9a9080', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            A top-level error occurred. This is very unusual — please try refreshing.
          </p>

          {error.digest && (
            <p style={{ fontSize: '0.75rem', color: '#6b6055', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
              Error ID: {error.digest}
            </p>
          )}

          <button
            onClick={reset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderRadius: 9999,
              background: '#dcb45a',
              color: '#141310',
              fontWeight: 600,
              fontSize: '0.875rem',
              padding: '0.625rem 1.5rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
