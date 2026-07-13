'use client'

import { useMemo, useState, useTransition, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Star, Trash2, RefreshCw, StickyNote, ChevronDown, ChevronUp, BarChart3, Search, SortAsc } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  removeFromWatchlist,
  updateWatchlistProgress,
  updateWatchlistStatus,
  updateWatchlistRating,
  updateWatchlistNotes,
  incrementRewatchCount,
  type WatchStatus,
} from '@/app/actions/watchlist'
import type { WatchlistEntry } from '@/lib/db/schema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// ── Constants ──────────────────────────────────────────────────────────────

const TABS: { value: WatchStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'WATCHING', label: 'Watching' },
  { value: 'PLANNING', label: 'Plan to Watch' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'PAUSED', label: 'Paused' },
  { value: 'DROPPED', label: 'Dropped' },
]

const STATUS_COLOR: Record<WatchStatus, string> = {
  WATCHING:  'text-emerald-400 bg-emerald-400/10',
  COMPLETED: 'text-primary bg-primary/10',
  PLANNING:  'text-blue-400 bg-blue-400/10',
  PAUSED:    'text-orange-400 bg-orange-400/10',
  DROPPED:   'text-red-400 bg-red-400/10',
}

// ── Star rating component ──────────────────────────────────────────────────

function StarRating({
  value: initialValue, animeId, disabled,
}: { value: number | null; animeId: number; disabled: boolean }) {
  const [value, setValue] = useState(initialValue)
  const [hovered, setHovered] = useState<number | null>(null)
  const [, startTransition] = useTransition()
  const display = hovered ?? value ?? 0

  function rate(n: number) {
    const newRating = value === n ? null : n
    setValue(newRating)   // optimistic update
    startTransition(async () => {
      await updateWatchlistRating(animeId, newRating)
    })
  }

  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${value ?? 'none'} out of 10`}>
      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          disabled={disabled}
          onClick={() => rate(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(null)}
          aria-label={`Rate ${n}`}
          className="p-0.5 transition-transform hover:scale-110 disabled:cursor-default"
        >
          <Star
            className={`h-3 w-3 transition-colors ${
              n <= display ? 'fill-primary text-primary' : 'text-muted-foreground/30'
            }`}
          />
        </button>
      ))}
      {value && (
        <span className="ml-1 text-xs font-semibold text-primary tabular-nums">{value}/10</span>
      )}
    </div>
  )
}

// ── Notes field ────────────────────────────────────────────────────────────

function NotesField({ animeId, initial, disabled }: { animeId: number; initial: string | null; disabled: boolean }) {
  const [open, setOpen] = useState(!!initial)
  const [value, setValue] = useState(initial ?? '')
  const [saving, setSaving] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleChange(v: string) {
    setValue(v)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      setSaving(true)
      await updateWatchlistNotes(animeId, v)
      setSaving(false)
    }, 800)
  }

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <StickyNote className="h-3 w-3" />
        {open ? 'Hide notes' : value ? 'View notes' : 'Add notes'}
        {open ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>
      {open && (
        <div className="mt-1.5 relative">
          <textarea
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            placeholder="Personal notes about this anime…"
            rows={2}
            className="w-full resize-none rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
          />
          {saving && (
            <span className="absolute bottom-2 right-2 text-[10px] text-muted-foreground">Saving…</span>
          )}
        </div>
      )}
    </div>
  )
}

// ── Stats bar ──────────────────────────────────────────────────────────────

function StatsBar({ entries }: { entries: WatchlistEntry[] }) {
  const stats = useMemo(() => {
    const totalEps = entries.reduce((s, e) => s + (e.progress ?? 0), 0)
    const hours = Math.round((totalEps * 24) / 60)
    const rated = entries.filter((e) => e.userRating != null)
    const avgRating = rated.length
      ? (rated.reduce((s, e) => s + (e.userRating ?? 0), 0) / rated.length).toFixed(1)
      : null
    const watching  = entries.filter((e) => e.status === 'WATCHING').length
    const completed = entries.filter((e) => e.status === 'COMPLETED').length
    const planning  = entries.filter((e) => e.status === 'PLANNING').length
    return { totalEps, hours, avgRating, watching, completed, planning }
  }, [entries])

  if (entries.length === 0) return null

  const items = [
    { label: 'Total',     value: entries.length,    unit: 'anime' },
    { label: 'Watching',  value: stats.watching,     unit: '' },
    { label: 'Completed', value: stats.completed,    unit: '' },
    { label: 'Planning',  value: stats.planning,     unit: '' },
    { label: 'Episodes',  value: stats.totalEps,     unit: 'watched' },
    { label: 'Time',      value: stats.hours,        unit: 'hrs' },
    ...(stats.avgRating ? [{ label: 'Avg Rating', value: stats.avgRating, unit: '/10' }] : []),
  ]

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-secondary/30 p-4">
      <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        <BarChart3 className="h-3.5 w-3.5" />
        My Stats
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col">
            <span className="text-xl font-black tabular-nums text-primary leading-none">
              {item.value}
              <span className="ml-0.5 text-xs font-medium text-muted-foreground">{item.unit}</span>
            </span>
            <span className="mt-1 text-[10px] text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main WatchlistView ─────────────────────────────────────────────────────

export function WatchlistView({ entries }: { entries: WatchlistEntry[] }) {
  const router = useRouter()
  const [tab, setTab]     = useState<WatchStatus | 'ALL'>('ALL')
  const [query, setQuery] = useState('')
  const [sort, setSort]   = useState<'updated' | 'title' | 'rating' | 'progress' | 'score'>('updated')
  const [isPending, startTransition] = useTransition()

  const filtered = useMemo(() => {
    let list = tab === 'ALL' ? entries : entries.filter((e) => e.status === tab)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((e) => e.title.toLowerCase().includes(q))
    }
    return [...list].sort((a, b) => {
      switch (sort) {
        case 'title':    return a.title.localeCompare(b.title)
        case 'rating':   return (b.userRating ?? 0) - (a.userRating ?? 0)
        case 'progress': {
          const ap = a.episodes ? a.progress / a.episodes : 0
          const bp = b.episodes ? b.progress / b.episodes : 0
          return bp - ap
        }
        case 'score':    return (b.averageScore ?? 0) - (a.averageScore ?? 0)
        default:         return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      }
    })
  }, [entries, tab, query, sort])

  const counts = useMemo(() => {
    const c: Record<string, number> = { ALL: entries.length }
    for (const e of entries) c[e.status] = (c[e.status] ?? 0) + 1
    return c
  }, [entries])

  const act = (fn: () => Promise<void>) =>
    startTransition(async () => {
      await fn()
      router.refresh()
    })

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <StatsBar entries={entries} />

      {/* Search + Sort controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder="Search your watchlist…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-secondary/50 py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {/* Sort */}
        <div className="flex items-center gap-2">
          <SortAsc className="h-4 w-4 shrink-0 text-muted-foreground" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="updated">Recently Updated</option>
            <option value="title">Title A–Z</option>
            <option value="rating">My Rating</option>
            <option value="progress">Progress %</option>
            <option value="score">AniList Score</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div role="tablist" aria-label="Filter by status" className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.value}
            role="tab"
            aria-selected={tab === t.value}
            onClick={() => setTab(t.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              tab === t.value
                ? 'bg-primary text-primary-foreground shadow-[0_0_12px_oklch(0.88_0.11_90_/_30%)]'
                : 'bg-secondary text-secondary-foreground hover:bg-muted'
            }`}
          >
            {t.label}
            <span className="ml-1.5 text-xs opacity-70">{counts[t.value] ?? 0}</span>
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">
            {entries.length === 0
              ? 'Your watchlist is empty. Browse anime and add titles to start tracking.'
              : 'No titles with this status.'}
          </p>
          <Button className="mt-4" render={<Link href="/browse" />}>
            Browse Anime
          </Button>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map((entry) => (
            <li
              key={entry.id}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-white/[0.12] hover:shadow-lg"
            >
              {/* Cover */}
              <Link href={`/anime/${entry.animeId}`} className="shrink-0">
                {entry.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={entry.coverImage}
                    alt=""
                    className="h-24 w-16 rounded-xl object-cover transition-transform group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="h-24 w-16 rounded-xl bg-muted" />
                )}
              </Link>

              {/* Main content */}
              <div className="min-w-0 flex-1">
                {/* Title + meta */}
                <Link
                  href={`/anime/${entry.animeId}`}
                  className="line-clamp-1 font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {entry.title}
                </Link>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  {entry.format && <span>{entry.format.replace(/_/g, ' ')}</span>}
                  {entry.averageScore != null && (
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      {(entry.averageScore / 10).toFixed(1)}
                    </span>
                  )}
                  {/* Status badge */}
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_COLOR[entry.status as WatchStatus] ?? ''}`}>
                    {entry.status}
                  </span>
                  {entry.rewatchCount > 0 && (
                    <span className="flex items-center gap-1 text-teal-400">
                      <RefreshCw className="h-3 w-3" />
                      ×{entry.rewatchCount}
                    </span>
                  )}
                </div>

                {/* Progress */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Ep</span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-6 bg-transparent"
                    disabled={isPending || entry.progress <= 0}
                    onClick={() => act(() => updateWatchlistProgress(entry.animeId, entry.progress - 1))}
                    aria-label="Decrease episode"
                  >
                    <Minus className="size-3" />
                  </Button>
                  <span className="min-w-16 text-center text-sm tabular-nums text-foreground">
                    {entry.progress}{entry.episodes ? ` / ${entry.episodes}` : ''}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-6 bg-transparent"
                    disabled={isPending || (entry.episodes != null && entry.progress >= entry.episodes)}
                    onClick={() => act(() => updateWatchlistProgress(entry.animeId, entry.progress + 1))}
                    aria-label="Increase episode"
                  >
                    <Plus className="size-3" />
                  </Button>

                  {/* Episode progress bar */}
                  {entry.episodes && entry.episodes > 0 && (
                    <div className="ml-1 h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${Math.min(100, (entry.progress / entry.episodes) * 100)}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Star rating */}
                <div className="mt-2">
                  <StarRating value={entry.userRating} animeId={entry.animeId} disabled={isPending} />
                </div>

                {/* Notes */}
                <NotesField animeId={entry.animeId} initial={entry.notes} disabled={isPending} />
              </div>

              {/* Right controls */}
              <div className="flex shrink-0 flex-col items-end gap-2">
                <Select
                  value={entry.status}
                  onValueChange={(v) => act(() => updateWatchlistStatus(entry.animeId, v as WatchStatus))}
                  disabled={isPending}
                >
                  <SelectTrigger className="w-36" aria-label="Watch status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TABS.filter((t) => t.value !== 'ALL').map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-1">
                  {/* Rewatch button */}
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => act(() => incrementRewatchCount(entry.animeId))}
                    aria-label="Increment rewatch count"
                    title="Mark as rewatched"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-teal-400/10 hover:text-teal-400 disabled:opacity-40"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </button>

                  {/* Remove */}
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => act(() => removeFromWatchlist(entry.animeId))}
                    aria-label={`Remove ${entry.title}`}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-400/10 hover:text-red-400 disabled:opacity-40"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
