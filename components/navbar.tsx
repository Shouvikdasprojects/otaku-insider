'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Search, X, Loader2, Clock, TrendingUp,
  CornerDownLeft, Star, ArrowUpRight, Menu as MenuIcon,
} from 'lucide-react'
import { UserMenu } from '@/components/user-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { searchAnime, getTrending, type SearchSuggestion } from '@/lib/anilist-search'

// ── Nav links ──────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/browse', label: 'Browse' },
  { href: '/seasonal', label: 'Seasonal' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/top', label: 'Top 100' },
  { href: '/awards', label: '🏆 Awards' },
  { href: '/genres', label: 'Genres' },
  { href: '/watchlist', label: 'Watchlist' },
  { href: '/stats', label: '📊 Stats' },
]

// ── Recent-search helpers (localStorage) ──────────────────────────────────

const RECENT_KEY = 'otaku-recent-v2'
const MAX_RECENT = 5

function readRecent(): SearchSuggestion[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]') } catch { return [] }
}
function writeRecent(items: SearchSuggestion[]) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(items.slice(0, MAX_RECENT)))
}
function pushRecent(s: SearchSuggestion) {
  writeRecent([s, ...readRecent().filter((r) => r.id !== s.id)])
}

// ── Formatting helpers ─────────────────────────────────────────────────────

const FORMAT_LABEL: Record<string, string> = {
  TV: 'TV', TV_SHORT: 'TV Short', MOVIE: 'Movie',
  OVA: 'OVA', ONA: 'ONA', SPECIAL: 'Special', MUSIC: 'Music',
}
function fmtFormat(f: string | null) { return f ? (FORMAT_LABEL[f] ?? f) : null }
function fmtScore(s: number) { return (s / 10).toFixed(1) }
function scoreClass(s: number) {
  if (s >= 80) return 'text-emerald-400'
  if (s >= 65) return 'text-primary'
  return 'text-orange-400'
}

// ── Highlighted title ──────────────────────────────────────────────────────

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-primary font-bold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────

function CoverThumb({ src, alt }: { src: string | null; alt: string }) {
  return (
    <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-lg bg-secondary">
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" unoptimized />
      ) : (
        <div className="h-full w-full bg-secondary" />
      )}
    </div>
  )
}

function ResultRow({
  s, query, active, delay, onSelect, onHover,
}: {
  s: SearchSuggestion; query: string; active: boolean; delay: number
  onSelect: () => void; onHover: () => void
}) {
  const fmt = fmtFormat(s.format)
  return (
    <div
      role="option"
      aria-selected={active}
      onMouseDown={(e) => { e.preventDefault(); onSelect() }}
      onMouseEnter={onHover}
      className={`search-item group flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-colors
        ${active ? 'bg-accent' : 'hover:bg-accent/60'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CoverThumb src={s.coverImage} alt={s.title} />

      <div className="min-w-0 flex-1">
        {/* Title with highlight */}
        <p className="truncate text-sm font-semibold leading-tight">
          <HighlightMatch text={s.title} query={query} />
        </p>

        {/* English subtitle if different */}
        {s.englishTitle && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground leading-tight">
            {s.englishTitle}
          </p>
        )}

        {/* Meta row: format · year · score */}
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          {fmt && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-secondary text-muted-foreground uppercase tracking-wide">
              {fmt}
            </span>
          )}
          {s.seasonYear && (
            <span className="text-xs text-muted-foreground">{s.seasonYear}</span>
          )}
          {s.averageScore && (
            <span className={`flex items-center gap-0.5 text-xs font-medium ${scoreClass(s.averageScore)}`}>
              <Star className="h-3 w-3 fill-current" aria-hidden="true" />
              {fmtScore(s.averageScore)}
            </span>
          )}
          {/* Genre pills */}
          {s.genres.slice(0, 2).map((g) => (
            <span key={g} className="text-[10px] px-1.5 py-0.5 rounded-full border border-border/60 text-muted-foreground">
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow on active */}
      <ArrowUpRight
        className={`h-4 w-4 shrink-0 transition-all duration-150
          ${active ? 'text-primary opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'}`}
        aria-hidden="true"
      />
    </div>
  )
}

function TrendingRow({
  s, rank, active, delay, onSelect, onHover,
}: {
  s: SearchSuggestion; rank: number; active: boolean; delay: number
  onSelect: () => void; onHover: () => void
}) {
  const fmt = fmtFormat(s.format)
  return (
    <div
      role="option"
      aria-selected={active}
      onMouseDown={(e) => { e.preventDefault(); onSelect() }}
      onMouseEnter={onHover}
      className={`search-item flex cursor-pointer items-center gap-3 px-4 py-2 transition-colors
        ${active ? 'bg-accent' : 'hover:bg-accent/60'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Rank number */}
      <span
        className={`w-5 shrink-0 text-center text-sm font-bold tabular-nums
          ${rank <= 3 ? 'text-primary' : 'text-muted-foreground'}`}
      >
        {rank}
      </span>

      <CoverThumb src={s.coverImage} alt={s.title} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{s.title}</p>
        <div className="mt-0.5 flex items-center gap-2">
          {fmt && <span className="text-xs text-muted-foreground">{fmt}</span>}
          {s.seasonYear && <span className="text-xs text-muted-foreground">{s.seasonYear}</span>}
          {s.averageScore && (
            <span className={`flex items-center gap-0.5 text-xs font-medium ${scoreClass(s.averageScore)}`}>
              <Star className="h-3 w-3 fill-current" />
              {fmtScore(s.averageScore)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main Navbar ────────────────────────────────────────────────────────────

export function Navbar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [trending, setTrending] = useState<SearchSuggestion[]>([])
  const [recent, setRecent] = useState<SearchSuggestion[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Combine empty-state items for keyboard nav
  const emptyItems: SearchSuggestion[] = query.trim()
    ? []
    : [...recent, ...trending.slice(0, Math.max(0, 6 - recent.length))]

  const activeItems = query.trim() ? suggestions : emptyItems
  const dropdownOpen =
    isFocused &&
    (isSearching || suggestions.length > 0 || (!query.trim() && (recent.length > 0 || trending.length > 0)))

  // ── Effects ──────────────────────────────────────────────────────────────

  // Hydrate recent from localStorage
  useEffect(() => { setRecent(readRecent()) }, [])

  // Load trending once on mount
  useEffect(() => {
    getTrending().then(setTrending).catch(() => {})
  }, [])

  // Global "/" shortcut — focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName) || t.isContentEditable) return
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !inputRef.current?.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Debounced search
  const runSearch = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!q.trim()) { setSuggestions([]); setIsSearching(false); return }
    setIsSearching(true)
    debounceRef.current = setTimeout(async () => {
      const results = await searchAnime(q)
      setSuggestions(results)
      setIsSearching(false)
      setActiveIndex(-1)
    }, 280)
  }, [])

  useEffect(() => {
    runSearch(query)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, runSearch])

  // ── Handlers ─────────────────────────────────────────────────────────────

  function selectSuggestion(s: SearchSuggestion) {
    pushRecent(s)
    setRecent(readRecent())
    setQuery('')
    setIsFocused(false)
    setMobileOpen(false)
    router.push(`/anime/${s.id}`)
  }

  function goToAll() {
    const q = query.trim()
    if (!q) return
    setIsFocused(false)
    setMobileOpen(false)
    router.push(`/browse?search=${encodeURIComponent(q)}`)
  }

  function submitSearch(e: React.FormEvent) {
    e.preventDefault()
    if (activeIndex >= 0 && activeItems[activeIndex]) {
      selectSuggestion(activeItems[activeIndex])
    } else {
      goToAll()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, activeItems.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Escape') {
      setIsFocused(false)
      setActiveIndex(-1)
      inputRef.current?.blur()
    }
  }

  function clearRecent() {
    localStorage.removeItem(RECENT_KEY)
    setRecent([])
  }

  function removeOneRecent(id: number) {
    const next = readRecent().filter((r) => r.id !== id)
    writeRecent(next)
    setRecent(next)
  }

  // ── Search UI (reused for desktop) ───────────────────────────────────────

  const SearchWidget = (
    <div className="relative" role="search">
      <form onSubmit={submitSearch} autoComplete="off">
        {/* ── Input wrapper ── */}
        <div
          className={`relative transition-[width] duration-300 ease-out
            ${isFocused ? 'w-80 lg:w-[26rem]' : 'w-48 lg:w-64'}`}
        >
          {/* Left icon */}
          <div className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2">
            {isSearching
              ? <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden="true" />
              : <Search className={`h-4 w-4 transition-colors duration-200 ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden="true" />
            }
          </div>

          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search anime..."
            aria-label="Search anime"
            aria-autocomplete="list"
            aria-expanded={dropdownOpen}
            aria-controls={dropdownOpen ? 'search-dropdown' : undefined}
            aria-activedescendant={activeIndex >= 0 ? `search-opt-${activeIndex}` : undefined}
            className={`h-10 w-full rounded-full border bg-secondary/60 pl-10 pr-10 text-sm
              placeholder:text-muted-foreground outline-none
              transition-all duration-300 backdrop-blur-sm
              ${isFocused
                ? 'border-primary/50 ring-2 ring-primary/20 bg-secondary shadow-[0_0_28px_oklch(0.88_0.11_90_/_18%)]'
                : 'border-input hover:border-border'
              }`}
          />

          {/* Right: clear button or "/" badge */}
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {query ? (
              <button
                type="button"
                onClick={() => { setQuery(''); inputRef.current?.focus() }}
                aria-label="Clear search"
                className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            ) : !isFocused ? (
              <kbd className="hidden lg:flex h-5 items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground select-none">
                /
              </kbd>
            ) : null}
          </div>
        </div>
      </form>

      {/* ── Dropdown ── */}
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          id="search-dropdown"
          role="listbox"
          aria-label="Search results"
          className="search-dropdown search-scroll absolute left-0 right-0 top-[calc(100%+8px)] z-[200] overflow-y-auto rounded-2xl border border-white/[0.06] bg-[oklch(0.14_0.009_85_/_96%)] backdrop-blur-2xl"
          style={{
            maxHeight: '76vh',
            boxShadow: '0 24px 64px rgba(0,0,0,0.75), 0 0 0 1px oklch(0.88 0.11 90 / 8%)',
          }}
        >
          {/* ── Empty state ─────────────────────────────── */}
          {!query.trim() && (
            <>
              {recent.length > 0 && (
                <section aria-label="Recent searches">
                  <div className="flex items-center justify-between px-4 pb-1.5 pt-3.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      Recent
                    </div>
                    <button
                      onMouseDown={(e) => { e.preventDefault(); clearRecent() }}
                      className="text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Clear all
                    </button>
                  </div>

                  {recent.map((s, i) => (
                    <div
                      key={s.id}
                      id={`search-opt-${i}`}
                      role="option"
                      aria-selected={i === activeIndex}
                      onMouseDown={(e) => { e.preventDefault(); selectSuggestion(s) }}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`search-item group flex cursor-pointer items-center gap-3 px-4 py-2 transition-colors
                        ${i === activeIndex ? 'bg-accent' : 'hover:bg-accent/50'}`}
                      style={{ animationDelay: `${i * 25}ms` }}
                    >
                      <Clock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                      <span className="flex-1 truncate text-sm">{s.title}</span>
                      <button
                        type="button"
                        onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); removeOneRecent(s.id) }}
                        aria-label={`Remove ${s.title}`}
                        className="shrink-0 rounded p-0.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </section>
              )}

              {trending.length > 0 && (
                <section aria-label="Trending anime">
                  {recent.length > 0 && <div className="mx-4 my-1.5 border-t border-white/[0.05]" />}
                  <div className="flex items-center gap-1.5 px-4 pb-1.5 pt-3 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                    <TrendingUp className="h-3 w-3" aria-hidden="true" />
                    Trending Now
                  </div>

                  {trending.map((s, i) => {
                    const idx = i + recent.length
                    return (
                      <TrendingRow
                        key={s.id}
                        s={s}
                        rank={i + 1}
                        active={idx === activeIndex}
                        delay={i * 35}
                        onSelect={() => selectSuggestion(s)}
                        onHover={() => setActiveIndex(idx)}
                      />
                    )
                  })}
                </section>
              )}

              {/* Tip footer */}
              <div className="flex items-center justify-between border-t border-white/[0.05] bg-white/[0.02] px-4 py-2.5">
                <span className="text-[11px] text-muted-foreground">
                  Start typing to search
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <kbd className="rounded border border-border bg-muted px-1 font-mono text-[10px]">↑</kbd>
                  <kbd className="rounded border border-border bg-muted px-1 font-mono text-[10px]">↓</kbd>
                  to navigate
                </span>
              </div>
            </>
          )}

          {/* ── Search results ───────────────────────────── */}
          {query.trim() && (
            <>
              {isSearching && suggestions.length === 0 && (
                <div className="flex items-center justify-center gap-2.5 py-10 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching for &ldquo;{query}&rdquo;…
                </div>
              )}

              {suggestions.length > 0 && (
                <section aria-label="Search results">
                  <div className="px-4 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                    Results
                  </div>
                  {suggestions.map((s, i) => (
                    <ResultRow
                      key={s.id}
                      s={s}
                      query={query}
                      active={i === activeIndex}
                      delay={i * 30}
                      onSelect={() => selectSuggestion(s)}
                      onHover={() => setActiveIndex(i)}
                    />
                  ))}
                </section>
              )}

              {!isSearching && suggestions.length === 0 && (
                <div className="px-4 py-10 text-center">
                  <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/60">
                    Try a different spelling or search term
                  </p>
                </div>
              )}

              {/* See-all footer */}
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); goToAll() }}
                className="group flex w-full items-center gap-2 border-t border-white/[0.05] bg-white/[0.02] px-4 py-3 text-xs text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
              >
                <Search className="h-3.5 w-3.5 shrink-0" />
                <span className="flex-1 text-left">
                  See all results for{' '}
                  <span className="font-semibold text-foreground">&ldquo;{query}&rdquo;</span>
                </span>
                <CornerDownLeft className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-y-0.5" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Otaku Insider home">
          <Image
            src="/logo.jpg" alt="" width={36} height={36}
            className="h-9 w-9 rounded-full glow-primary" priority
          />
          <span className="text-lg font-bold tracking-tight">
            Otaku <span className="text-primary">Insider</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href} href={l.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop search */}
        <div className="ml-auto hidden sm:block">{SearchWidget}</div>

        {/* Theme toggle + User menu */}
        <div className="hidden sm:flex items-center gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground sm:ml-0 lg:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div className="relative z-50 border-t border-border bg-background px-4 py-4 flex flex-col gap-2 lg:hidden">
          {/* Full premium search on mobile */}
          <div className="w-full [&>div]:w-full [&_input]:w-full [&>div>div]:w-full">
            {SearchWidget}
          </div>

          {NAV_LINKS.map((l) => (
            <Link
              key={l.href} href={l.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}

          <div className="px-3 pt-2">
            <UserMenu />
          </div>
        </div>
      )}
    </header>
  )
}
