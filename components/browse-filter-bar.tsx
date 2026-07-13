'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search, RotateCcw } from 'lucide-react'

const YEARS = Array.from({ length: 40 }, (_, i) => String(new Date().getFullYear() + 1 - i))
const SEASONS = ['WINTER', 'SPRING', 'SUMMER', 'FALL']
const FORMATS = ['TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL', 'MUSIC']
const STATUSES = [
  { value: 'RELEASING', label: 'Airing' },
  { value: 'FINISHED', label: 'Finished' },
  { value: 'NOT_YET_RELEASED', label: 'Upcoming' },
]
const SORTS = [
  { value: 'POPULARITY_DESC', label: 'Popularity' },
  { value: 'TRENDING_DESC', label: 'Trending' },
  { value: 'SCORE_DESC', label: 'Score' },
  { value: 'START_DATE_DESC', label: 'Newest' },
]

interface Current {
  search?: string
  genre?: string
  year?: string
  season?: string
  format?: string
  status?: string
  sort?: string
  minScore?: string
  episodeRange?: string
}

const selectClass =
  'h-10 rounded-lg border border-input bg-secondary px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30'

export function BrowseFilterBar({ genres, current }: { genres: string[]; current: Current }) {
  const router = useRouter()
  const [filters, setFilters] = useState<Current>(current)

  function update(key: keyof Current, value: string) {
    const next = { ...filters, [key]: value }
    setFilters(next)
    push(next)
  }

  function push(next: Current) {
    const sp = new URLSearchParams()
    for (const [k, v] of Object.entries(next)) {
      if (v) sp.set(k, v)
    }
    router.push(`/browse?${sp.toString()}`)
  }

  function submitSearch(e: React.FormEvent) {
    e.preventDefault()
    push(filters)
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
      <form onSubmit={submitSearch} className="relative" role="search">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={filters.search ?? ''}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          placeholder="Search by title..."
          aria-label="Search anime by title"
          className="h-11 w-full rounded-lg border border-input bg-secondary pl-9 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
      </form>

      <div className="flex flex-wrap items-center gap-2">
        <label className="sr-only" htmlFor="filter-genre">Genre</label>
        <select id="filter-genre" className={selectClass} value={filters.genre ?? ''} onChange={(e) => update('genre', e.target.value)}>
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <label className="sr-only" htmlFor="filter-year">Year</label>
        <select id="filter-year" className={selectClass} value={filters.year ?? ''} onChange={(e) => update('year', e.target.value)}>
          <option value="">Any Year</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <label className="sr-only" htmlFor="filter-season">Season</label>
        <select id="filter-season" className={selectClass} value={filters.season ?? ''} onChange={(e) => update('season', e.target.value)}>
          <option value="">Any Season</option>
          {SEASONS.map((s) => (
            <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
          ))}
        </select>

        <label className="sr-only" htmlFor="filter-format">Format</label>
        <select id="filter-format" className={selectClass} value={filters.format ?? ''} onChange={(e) => update('format', e.target.value)}>
          <option value="">Any Format</option>
          {FORMATS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        <label className="sr-only" htmlFor="filter-status">Status</label>
        <select id="filter-status" className={selectClass} value={filters.status ?? ''} onChange={(e) => update('status', e.target.value)}>
          <option value="">Any Status</option>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <label className="sr-only" htmlFor="filter-minscore">Min Score</label>
        <select id="filter-minscore" className={selectClass} value={filters.minScore ?? ''} onChange={(e) => update('minScore', e.target.value)}>
          <option value="">Any Score</option>
          <option value="50">50+ Score</option>
          <option value="60">60+ Score</option>
          <option value="65">65+ Score</option>
          <option value="70">70+ Score</option>
          <option value="75">75+ Score</option>
          <option value="80">80+ Score</option>
          <option value="85">85+ Score</option>
          <option value="90">90+ Score</option>
        </select>

        <label className="sr-only" htmlFor="filter-episodes">Episode Length</label>
        <select id="filter-episodes" className={selectClass} value={filters.episodeRange ?? ''} onChange={(e) => update('episodeRange', e.target.value)}>
          <option value="">Any Length</option>
          <option value="short">Short (1–12 eps)</option>
          <option value="medium">Medium (13–26 eps)</option>
          <option value="long">Long (26+ eps)</option>
        </select>

        <label className="sr-only" htmlFor="filter-sort">Sort by</label>
        <select id="filter-sort" className={selectClass} value={filters.sort ?? 'POPULARITY_DESC'} onChange={(e) => update('sort', e.target.value)}>
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>Sort: {s.label}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => {
            setFilters({})
            router.push('/browse')
          }}
          className="ml-auto flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
      </div>
    </div>
  )
}
