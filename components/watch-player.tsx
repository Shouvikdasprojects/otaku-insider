'use client'

import { useState } from 'react'
import { Play, ExternalLink, MonitorPlay } from '@/components/icons'

interface Episode {
  title: string | null
  thumbnail: string | null
  url: string | null
  site: string | null
}

export function WatchPlayer({
  title,
  trailerId,
  cover,
  episodes,
}: {
  title: string
  trailerId: string | null
  cover: string | null
  episodes: Episode[]
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const selectedEp = selected != null ? episodes[selected] : null

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* Player */}
      <div className="flex flex-col gap-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card">
          {selectedEp ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
              {selectedEp.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedEp.thumbnail || '/placeholder.svg'}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover opacity-25"
                />
              )}
              <div className="relative flex flex-col items-center gap-4">
                <MonitorPlay className="h-10 w-10 text-primary" aria-hidden="true" />
                <p className="max-w-md text-lg font-semibold text-balance">{selectedEp.title || 'Episode'}</p>
                <p className="max-w-sm text-sm text-muted-foreground text-pretty">
                  This episode streams officially on {selectedEp.site || 'an external platform'}. Click below to
                  watch it in full quality.
                </p>
                <a
                  href={selectedEp.url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-primary flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                  Stream on {selectedEp.site || 'External Site'}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          ) : trailerId ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailerId}?rel=0`}
              title={`${title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              {cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cover || '/placeholder.svg'}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover opacity-20"
                />
              )}
              <p className="relative text-muted-foreground">No trailer available for this title.</p>
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">
          {selectedEp ? selectedEp.title || 'Episode' : `${title} — Official Trailer`}
        </h1>
      </div>

      {/* Episode list */}
      <aside className="flex max-h-[70vh] flex-col gap-2 overflow-y-auto rounded-2xl border border-border bg-card p-3" aria-label="Episode list">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className={`flex items-center gap-3 rounded-xl p-2 text-left transition-colors ${
            selected == null ? 'bg-primary/15 ring-1 ring-primary/50' : 'hover:bg-accent'
          }`}
        >
          <span className="flex h-12 w-20 shrink-0 items-center justify-center rounded-lg bg-secondary">
            <Play className="h-4 w-4 text-primary" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold">Official Trailer</span>
        </button>

        {episodes.map((ep, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setSelected(i)}
            className={`flex items-center gap-3 rounded-xl p-2 text-left transition-colors ${
              selected === i ? 'bg-primary/15 ring-1 ring-primary/50' : 'hover:bg-accent'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ep.thumbnail || '/placeholder.svg?height=48&width=80&query=anime%20episode'}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-12 w-20 shrink-0 rounded-lg object-cover"
            />
            <span className="line-clamp-2 text-sm">{ep.title || `Episode ${i + 1}`}</span>
          </button>
        ))}

        {episodes.length === 0 && (
          <p className="p-3 text-sm text-muted-foreground">
            No streaming episodes listed for this title yet.
          </p>
        )}
      </aside>
    </div>
  )
}
