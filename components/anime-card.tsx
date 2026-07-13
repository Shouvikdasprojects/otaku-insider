import Link from 'next/link'
import { Star } from '@/components/icons'
import { displayTitle, formatStatus, type AnimeMedia } from '@/lib/anilist'

export function AnimeCard({
  anime,
  rank,
  className = 'w-40 sm:w-44 shrink-0',
}: {
  anime: AnimeMedia
  rank?: number
  className?: string
}) {
  const title = displayTitle(anime)
  const cover = anime.coverImage.extraLarge || anime.coverImage.large

  return (
    <Link
      href={`/anime/${anime.id}`}
      className={`card-3d group relative flex flex-col overflow-hidden rounded-xl bg-card ${className}`}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover || '/placeholder.svg?height=264&width=176&query=anime%20poster'}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        {typeof rank === 'number' && (
          <span className="absolute left-2 top-2 flex h-7 min-w-7 items-center justify-center rounded-md bg-primary px-1.5 font-mono text-xs font-bold text-primary-foreground glow-primary">
            #{rank}
          </span>
        )}
        {anime.averageScore != null && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-background/80 px-1.5 py-0.5 text-xs font-semibold backdrop-blur">
            <Star className="h-3 w-3 fill-chart-3 text-chart-3" aria-hidden="true" />
            {(anime.averageScore / 10).toFixed(1)}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-pretty">{title}</h3>
        <p className="text-xs text-muted-foreground">
          {[anime.format?.replace('_', ' '), anime.episodes ? `${anime.episodes} ep` : formatStatus(anime.status)]
            .filter(Boolean)
            .join(' · ')}
        </p>
      </div>
    </Link>
  )
}
