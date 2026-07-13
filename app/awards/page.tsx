export const runtime = 'edge'
export const dynamic = 'force-static'

import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  Trophy, Medal, Star, Zap, Heart, Sparkles, Smile,
  Film, BrainCircuit, Clapperboard, Rocket, Flower2,
  Skull, Wand2, Compass, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { fetchYearAwards, AWARD_YEARS, type AwardAnime } from '@/lib/anilist-awards'
import type { Metadata } from 'next'

// ── Static params / metadata ───────────────────────────────────────────────

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>
}): Promise<Metadata> {
  const { year: y } = await searchParams
  const year = Number(y) || AWARD_YEARS[0]
  return {
    title: `${year} Anime Awards — Otaku Insider`,
    description: `The best anime of ${year} across every genre — Anime of the Year, Best Action, Romance, Fantasy, and more.`,
  }
}

// ── Category config ────────────────────────────────────────────────────────

const CATEGORIES = [
  { key: 'action' as const,       label: 'Best Action',        Icon: Zap,         ring: 'ring-orange-400/40',  bg: 'from-orange-500/15 to-orange-900/5',  text: 'text-orange-400'  },
  { key: 'romance' as const,      label: 'Best Romance',       Icon: Heart,        ring: 'ring-pink-400/40',    bg: 'from-pink-500/15 to-pink-900/5',      text: 'text-pink-400'    },
  { key: 'fantasy' as const,      label: 'Best Fantasy',       Icon: Sparkles,     ring: 'ring-purple-400/40',  bg: 'from-purple-500/15 to-purple-900/5',  text: 'text-purple-400'  },
  { key: 'comedy' as const,       label: 'Best Comedy',        Icon: Smile,        ring: 'ring-yellow-400/40',  bg: 'from-yellow-500/15 to-yellow-900/5',  text: 'text-yellow-400'  },
  { key: 'drama' as const,        label: 'Best Drama',         Icon: Film,         ring: 'ring-teal-400/40',    bg: 'from-teal-500/15 to-teal-900/5',      text: 'text-teal-400'    },
  { key: 'psychological' as const,label: 'Best Psychological', Icon: BrainCircuit, ring: 'ring-violet-400/40',  bg: 'from-violet-600/15 to-violet-900/5',  text: 'text-violet-400'  },
  { key: 'movie' as const,        label: 'Best Movie',         Icon: Clapperboard, ring: 'ring-amber-400/40',   bg: 'from-amber-500/15 to-amber-900/5',    text: 'text-amber-400'   },
  { key: 'scifi' as const,        label: 'Best Sci-Fi',        Icon: Rocket,       ring: 'ring-cyan-400/40',    bg: 'from-cyan-500/15 to-cyan-900/5',      text: 'text-cyan-400'    },
  { key: 'sliceOfLife' as const,  label: 'Best Slice of Life', Icon: Flower2,      ring: 'ring-emerald-400/40', bg: 'from-emerald-500/15 to-emerald-900/5',text: 'text-emerald-400' },
  { key: 'horror' as const,       label: 'Best Horror',        Icon: Skull,        ring: 'ring-red-500/40',     bg: 'from-red-900/20 to-red-950/5',        text: 'text-red-400'     },
  { key: 'supernatural' as const, label: 'Best Supernatural',  Icon: Wand2,        ring: 'ring-indigo-400/40',  bg: 'from-indigo-500/15 to-indigo-900/5',  text: 'text-indigo-400'  },
  { key: 'adventure' as const,    label: 'Best Adventure',     Icon: Compass,      ring: 'ring-orange-300/40',  bg: 'from-amber-400/15 to-orange-900/5',   text: 'text-orange-300'  },
] as const

// ── Helper: score display ──────────────────────────────────────────────────

function Score({ score }: { score: number | null }) {
  if (!score) return null
  const cls = score >= 85 ? 'text-emerald-400' : score >= 70 ? 'text-primary' : 'text-orange-400'
  return (
    <span className={`flex items-center gap-1 font-bold ${cls}`}>
      <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
      {(score / 10).toFixed(1)}
    </span>
  )
}

// ── Category winner card ───────────────────────────────────────────────────

function CategoryCard({
  anime, label, Icon, ring, bg, text,
}: {
  anime: AwardAnime | null
  label: string
  Icon: React.ComponentType<{ className?: string }>
  ring: string
  bg: string
  text: string
}) {
  if (!anime) {
    return (
      <div className={`group flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br ${bg} p-4 opacity-50`}>
        <div className={`mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${text}`}>
          <Icon className="h-3.5 w-3.5" />
          {label}
        </div>
        <p className="text-sm text-muted-foreground">No data for this year</p>
      </div>
    )
  }

  return (
    <Link
      href={`/anime/${anime.id}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br ${bg}
        ring-0 transition-all duration-300 hover:ring-1 ${ring} hover:scale-[1.02] hover:shadow-2xl`}
    >
      {/* Category label */}
      <div className={`flex items-center gap-2 px-4 pt-4 pb-3 text-[10px] font-bold uppercase tracking-[0.12em] ${text}`}>
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>

      {/* Content */}
      <div className="flex gap-3 px-4 pb-4">
        {/* Cover */}
        <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10">
          <Image
            src={anime.coverImage}
            alt={anime.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1 flex flex-col justify-center gap-1">
          <p className="line-clamp-2 text-sm font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
            {anime.title}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <Score score={anime.averageScore} />
            {anime.format && (
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
                {anime.format.replace('_', ' ')}
              </span>
            )}
          </div>
          {anime.genres.slice(0, 2).map((g) => (
            <span key={g} className="inline-block w-fit text-[10px] px-1.5 py-0.5 rounded-full border border-white/10 text-muted-foreground">
              {g}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

// ── Runner-up card (2nd / 3rd place) ──────────────────────────────────────

function RunnerUpCard({ anime, rank }: { anime: AwardAnime; rank: number }) {
  return (
    <Link
      href={`/anime/${anime.id}`}
      className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all hover:bg-white/[0.05] hover:scale-[1.01]"
    >
      <span className="w-6 text-center text-lg font-black text-muted-foreground/60">
        #{rank}
      </span>
      <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded-lg">
        <Image src={anime.coverImage} alt={anime.title} fill className="object-cover" unoptimized />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium group-hover:text-primary transition-colors">{anime.title}</p>
        <Score score={anime.averageScore} />
      </div>
    </Link>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────

export default async function AwardsPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>
}) {
  const { year: y } = await searchParams
  const year = Math.min(
    Math.max(Number(y) || AWARD_YEARS[0], AWARD_YEARS[AWARD_YEARS.length - 1]),
    AWARD_YEARS[0],
  )

  if (isNaN(year)) notFound()

  const awards = await fetchYearAwards(year)
  const aoty = awards.overall[0] ?? null
  const runners = awards.overall.slice(1)

  const prevYear = year - 1
  const nextYear = year + 1
  const hasPrev = prevYear >= AWARD_YEARS[AWARD_YEARS.length - 1]
  const hasNext = nextYear <= AWARD_YEARS[0]

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-white/[0.06]"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.88 0.11 90 / 10%), transparent)' }}
      >
        {/* Decorative glow rings */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
          <div className="h-[500px] w-[500px] rounded-full border border-primary/10 opacity-50" />
          <div className="absolute h-[700px] w-[700px] rounded-full border border-primary/5" />
          <div className="absolute h-[900px] w-[900px] rounded-full border border-primary/[0.03]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          {/* Trophy icon */}
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/80"
            style={{ boxShadow: '0 0 40px oklch(0.88 0.11 90 / 30%), 0 0 80px oklch(0.88 0.11 90 / 10%)' }}
          >
            <Trophy className="h-9 w-9 text-primary" aria-hidden="true" />
          </div>

          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Otaku Insider Presents
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            <span
              className="bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent"
              style={{ backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }}
            >
              Anime Awards
            </span>
          </h1>
          <p className="mt-3 text-5xl font-black tabular-nums text-foreground/80 sm:text-7xl">
            {year}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            The best anime of {year}, ranked by AniList community scores
          </p>

          {/* Year picker */}
          <div className="mt-10 flex items-center justify-center gap-3">
            {hasPrev ? (
              <Link
                href={`/awards?year=${prevYear}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label={`Go to ${prevYear} awards`}
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>
            ) : (
              <div className="h-9 w-9" />
            )}

            <div className="flex flex-wrap justify-center gap-1.5 max-w-lg">
              {AWARD_YEARS.slice(0, 10).map((y) => (
                <Link
                  key={y}
                  href={`/awards?year=${y}`}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all
                    ${y === year
                      ? 'bg-primary text-primary-foreground shadow-[0_0_12px_oklch(0.88_0.11_90_/_35%)]'
                      : 'border border-border bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                >
                  {y}
                </Link>
              ))}
            </div>

            {hasNext ? (
              <Link
                href={`/awards?year=${nextYear}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label={`Go to ${nextYear} awards`}
              >
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <div className="h-9 w-9" />
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 space-y-14">

        {/* ── ANIME OF THE YEAR ─────────────────────────────────────── */}
        <section aria-labelledby="aoty-heading">
          <div className="mb-6 flex items-center gap-3">
            <Trophy className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 id="aoty-heading" className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Anime of the Year
            </h2>
          </div>

          {aoty ? (
            <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] shadow-2xl">
              {/* Banner background */}
              <div className="absolute inset-0">
                {aoty.bannerImage ? (
                  <Image
                    src={aoty.bannerImage}
                    alt=""
                    fill
                    className="object-cover opacity-30"
                    unoptimized
                    priority
                  />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{ background: 'radial-gradient(ellipse at top, oklch(0.88 0.11 90 / 15%), transparent 70%)' }}
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>

              {/* Content */}
              <Link href={`/anime/${aoty.id}`} className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8">
                {/* Crown badge */}
                <div className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 backdrop-blur-sm">
                  <Trophy className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Winner
                  </span>
                </div>

                {/* Cover */}
                <div
                  className="relative h-52 w-36 sm:h-60 sm:w-44 shrink-0 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px oklch(0.88 0.11 90 / 20%)' }}
                >
                  <Image
                    src={aoty.coverImage}
                    alt={aoty.title}
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                  />
                </div>

                {/* Info */}
                <div className="flex-1 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {aoty.genres.slice(0, 3).join(' · ')}
                  </p>
                  <h3 className="text-3xl font-black leading-tight text-foreground group-hover:text-primary transition-colors sm:text-4xl">
                    {aoty.title}
                  </h3>
                  {aoty.englishTitle && (
                    <p className="text-sm text-muted-foreground">{aoty.englishTitle}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    {aoty.averageScore && (
                      <div className="flex items-center gap-1.5">
                        <Star className="h-5 w-5 fill-primary text-primary" aria-hidden="true" />
                        <span className="text-2xl font-black text-primary">
                          {(aoty.averageScore / 10).toFixed(1)}
                        </span>
                        <span className="text-sm text-muted-foreground">/10</span>
                      </div>
                    )}
                    {aoty.episodes && (
                      <span className="text-sm text-muted-foreground">{aoty.episodes} episodes</span>
                    )}
                    {aoty.format && (
                      <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                        {aoty.format.replace('_', ' ')}
                      </span>
                    )}
                  </div>

                  {aoty.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 max-w-xl">
                      {aoty.description}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          ) : (
            <div className="rounded-3xl border border-white/[0.06] bg-secondary/30 p-12 text-center text-muted-foreground">
              No data available for {year}
            </div>
          )}

          {/* Runners up */}
          {runners.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {runners.map((anime, i) => (
                <RunnerUpCard key={anime.id} anime={anime} rank={i + 2} />
              ))}
            </div>
          )}
        </section>

        {/* ── CATEGORY AWARDS GRID ──────────────────────────────────── */}
        <section aria-labelledby="categories-heading">
          <div className="mb-6 flex items-center gap-3">
            <Medal className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 id="categories-heading" className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Category Awards
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map(({ key, label, Icon, ring, bg, text }) => (
              <CategoryCard
                key={key}
                anime={awards[key]}
                label={label}
                Icon={Icon}
                ring={ring}
                bg={bg}
                text={text}
              />
            ))}
          </div>
        </section>

        {/* ── Year navigation footer ────────────────────────────────── */}
        <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-secondary/20 px-6 py-4">
          {hasPrev ? (
            <Link
              href={`/awards?year=${prevYear}`}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              {prevYear} Awards
            </Link>
          ) : <div />}

          <span className="text-xs text-muted-foreground">
            Data powered by AniList
          </span>

          {hasNext ? (
            <Link
              href={`/awards?year=${nextYear}`}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {nextYear} Awards
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : <div />}
        </div>

      </div>
    </div>
  )
}
