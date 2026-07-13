import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Play, Star, Calendar, Clock, Film, ExternalLink } from 'lucide-react'
import { MediaRow } from '@/components/media-row'
import { WatchlistButton } from '@/components/watchlist-button'
import { TrackVisit } from '@/components/track-visit'
import { ShareButton } from '@/components/share-button'
import { CharacterGrid } from '@/components/character-grid'
import { ReviewsSection } from '@/components/reviews-section'
import { getSessionUser, getWatchlistEntry, type WatchStatus } from '@/app/actions/watchlist'
import { getReviews, getUserReview } from '@/app/actions/reviews'
import {
  fetchAnimeDetail,
  displayTitle,
  cleanDescription,
  formatStatus,
  type AnimeMedia,
} from '@/lib/anilist'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  try {
    const anime = await fetchAnimeDetail(Number.parseInt(id, 10))
    return {
      title: `${displayTitle(anime)} — Otaku Insider`,
      description: cleanDescription(anime.description, 160),
    }
  } catch {
    return { title: 'Anime — Otaku Insider' }
  }
}

function InfoStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-secondary/60 px-4 py-3">
      <span className="text-primary">{icon}</span>
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold">{value}</span>
      </div>
    </div>
  )
}

export default async function AnimeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const animeId = Number.parseInt(id, 10)
  if (Number.isNaN(animeId)) notFound()

  let anime: AnimeMedia
  try {
    anime = await fetchAnimeDetail(animeId)
  } catch {
    notFound()
  }

  const [entry, user, reviews, userReview] = await Promise.all([
    getWatchlistEntry(anime.id),
    getSessionUser(),
    getReviews(anime.id),
    getUserReview(anime.id),
  ])

  const title = displayTitle(anime)
  const banner = anime.bannerImage || anime.coverImage.extraLarge
  const cover = anime.coverImage.extraLarge || anime.coverImage.large
  const hasTrailer = anime.trailer?.site === 'youtube' && anime.trailer.id
  const episodes = anime.streamingEpisodes ?? []
  const recommendations = (anime.recommendations?.nodes ?? [])
    .map((n) => n.mediaRecommendation)
    .filter((m): m is AnimeMedia => m != null)
  const relations = (anime.relations?.edges ?? []).filter((e) =>
    ['PREQUEL', 'SEQUEL', 'SIDE_STORY', 'ALTERNATIVE', 'PARENT'].includes(e.relationType),
  )
  const characters = anime.characters?.edges ?? []

  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Track visit for Recently Viewed (client-only, no render) */}
      <TrackVisit
        id={anime.id}
        title={title}
        coverImage={cover}
        format={anime.format}
        averageScore={anime.averageScore}
      />
      {/* Banner header */}
      <section className="relative">
        <div className="absolute inset-0 h-full overflow-hidden">
          {banner && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={banner || '/placeholder.svg'} alt="" aria-hidden="true" className="h-full w-full object-cover opacity-25" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-8 pt-16 sm:px-6 md:flex-row md:items-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover || '/placeholder.svg?height=420&width=280&query=anime%20poster'}
            alt={`${title} poster`}
            className="glow-primary w-48 shrink-0 self-center rounded-2xl md:self-auto"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">{title}</h1>
            {anime.title.native && <p className="text-muted-foreground">{anime.title.native}</p>}
            <div className="flex flex-wrap gap-2">
              {anime.genres.map((g) => (
                <Link
                  key={g}
                  href={`/genre/${encodeURIComponent(g)}`}
                  className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground transition-colors hover:bg-accent"
                >
                  {g}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href={`/watch/${anime.id}`}
                className="glow-primary flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                {hasTrailer ? 'Watch Trailer & Episodes' : 'Watch Episodes'}
              </Link>
              <WatchlistButton
                anime={{
                  id: anime.id,
                  title: title,
                  coverImage: cover,
                  format: anime.format,
                  episodes: anime.episodes,
                  averageScore: anime.averageScore,
                }}
                isAuthed={user != null}
                currentStatus={(entry?.status as WatchStatus | undefined) ?? null}
              />
              <ShareButton title={title} />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6">
        {/* Stats */}
        <section aria-label="Anime details" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <InfoStat
            icon={<Star className="h-5 w-5" aria-hidden="true" />}
            label="Score"
            value={anime.averageScore != null ? `${(anime.averageScore / 10).toFixed(1)} / 10` : 'N/A'}
          />
          <InfoStat
            icon={<Film className="h-5 w-5" aria-hidden="true" />}
            label="Format"
            value={anime.format?.replace('_', ' ') ?? 'Unknown'}
          />
          <InfoStat
            icon={<Play className="h-5 w-5" aria-hidden="true" />}
            label="Episodes"
            value={anime.episodes ? String(anime.episodes) : formatStatus(anime.status)}
          />
          <InfoStat
            icon={<Clock className="h-5 w-5" aria-hidden="true" />}
            label="Duration"
            value={anime.duration ? `${anime.duration} min` : 'N/A'}
          />
          <InfoStat
            icon={<Calendar className="h-5 w-5" aria-hidden="true" />}
            label="Season"
            value={
              anime.season && anime.seasonYear
                ? `${anime.season.charAt(0) + anime.season.slice(1).toLowerCase()} ${anime.seasonYear}`
                : (anime.startDate?.year ? String(anime.startDate.year) : 'TBA')
            }
          />
        </section>

        {/* Synopsis */}
        <section className="flex flex-col gap-3" aria-label="Synopsis">
          <h2 className="text-2xl font-bold tracking-tight">Synopsis</h2>
          <p className="max-w-4xl leading-relaxed text-muted-foreground text-pretty">
            {cleanDescription(anime.description)}
          </p>
          {anime.studios?.nodes?.length ? (
            <p className="text-sm text-muted-foreground">
              Studio: <span className="font-semibold text-foreground">{anime.studios.nodes.map((s) => s.name).join(', ')}</span>
            </p>
          ) : null}
        </section>

        {/* Trailer */}
        {hasTrailer && (
          <section className="flex flex-col gap-4" aria-label="Trailer">
            <h2 className="text-2xl font-bold tracking-tight">Trailer</h2>
            <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-border">
              <iframe
                src={`https://www.youtube.com/embed/${anime.trailer!.id}`}
                title={`${title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </section>
        )}

        {/* Episodes */}
        {episodes.length > 0 && (
          <section className="flex flex-col gap-4" aria-label="Episodes">
            <h2 className="text-2xl font-bold tracking-tight">Episodes</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {episodes.slice(0, 12).map((ep, i) => (
                <a
                  key={i}
                  href={ep.url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col overflow-hidden rounded-xl bg-card transition-transform hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ep.thumbnail || '/placeholder.svg?height=180&width=320&query=anime%20episode'}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Play className="h-5 w-5 fill-current" aria-hidden="true" />
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 p-3">
                    <p className="line-clamp-1 text-sm font-medium">{ep.title || 'Episode'}</p>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  </div>
                </a>
              ))}
            </div>
            {episodes.length > 12 && (
              <Link href={`/watch/${anime.id}`} className="text-sm font-semibold text-primary hover:underline">
                View all {episodes.length} episodes
              </Link>
            )}
          </section>
        )}

        {/* Characters */}
        <CharacterGrid characters={anime.characters} />
      </div>

      {/* Relations */}
      {relations.length > 0 && (
        <div className="mx-auto w-full max-w-7xl">
          <MediaRow title="Related Anime" items={relations.map((e) => e.node)} />
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <MediaRow title={`More Like ${title}`} items={recommendations} />
        </div>
      )}

      {/* Reviews Section */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Community Reviews</h2>
        <ReviewsSection
          animeId={anime.id}
          animeTitle={title}
          animeCover={cover}
          initialReviews={reviews}
          currentUserId={user?.id ?? null}
          userReview={userReview}
        />
      </div>
    </div>
  )
}
