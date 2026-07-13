import Link from 'next/link'
import { ChevronRight } from '@/components/icons'
import { AnimeCard } from '@/components/anime-card'
import type { AnimeMedia } from '@/lib/anilist'

export function MediaRow({
  title,
  href,
  items,
  ranked = false,
}: {
  title: string
  href?: string
  items: AnimeMedia[]
  ranked?: boolean
}) {
  return (
    <section className="flex flex-col gap-4" aria-label={title}>
      <div className="flex items-center justify-between px-4 sm:px-6">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          <span className="mr-3 inline-block h-5 w-1 rounded-full bg-primary align-middle" aria-hidden="true" />
          {title}
        </h2>
        {href && (
          <Link
            href={href}
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            View all <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-4 pt-1 sm:px-6">
        {items.map((anime, i) => (
          <AnimeCard key={anime.id} anime={anime} rank={ranked ? i + 1 : undefined} />
        ))}
      </div>
    </section>
  )
}
