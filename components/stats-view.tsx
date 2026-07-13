'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Star, Clock, Tv2, CheckCircle2, BookmarkPlus, PauseCircle, XCircle, Eye, TrendingUp, Award } from 'lucide-react'
import type { WatchlistEntry } from '@/lib/db/schema'

// ── Donut chart ────────────────────────────────────────────────────────────

interface DonutSlice { label: string; value: number; color: string }

function DonutChart({ slices, total }: { slices: DonutSlice[]; total: number }) {
  const R = 54
  const C = 2 * Math.PI * R
  let offset = 0

  return (
    <div className="relative flex items-center justify-center">
      <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
        {/* Track */}
        <circle cx="70" cy="70" r={R} fill="none" strokeWidth="16"
          className="stroke-secondary" />
        {slices.filter(s => s.value > 0).map((s, i) => {
          const pct = s.value / total
          const dash = pct * C
          const el = (
            <circle key={i} cx="70" cy="70" r={R} fill="none" strokeWidth="16"
              stroke={s.color}
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          )
          offset += dash
          return el
        })}
      </svg>
      {/* Center label */}
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-black text-foreground">{total}</span>
        <span className="text-[10px] text-muted-foreground">Total</span>
      </div>
    </div>
  )
}

// ── Bar chart ──────────────────────────────────────────────────────────────

function BarChart({ data }: { data: { label: string; value: number; max: number; color?: string }[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {data.map(({ label, value, max, color }) => (
        <div key={label} className="flex items-center gap-3">
          <span className="w-20 shrink-0 truncate text-right text-xs text-muted-foreground">{label}</span>
          <div className="flex-1 overflow-hidden rounded-full bg-secondary h-2.5">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: max > 0 ? `${(value / max) * 100}%` : '0%', background: color ?? 'oklch(0.88 0.11 90)' }}
            />
          </div>
          <span className="w-6 text-right text-xs font-semibold tabular-nums text-foreground">{value}</span>
        </div>
      ))}
    </div>
  )
}

// ── Stat card ──────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string | number; sub?: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-widest">{label}</span>
      </div>
      <div>
        <p className="text-3xl font-black text-primary tabular-nums">{value}</p>
        {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  )
}

// ── Main view ──────────────────────────────────────────────────────────────

export function StatsView({ entries }: { entries: WatchlistEntry[] }) {
  const stats = useMemo(() => {
    const total     = entries.length
    const watching  = entries.filter(e => e.status === 'WATCHING').length
    const completed = entries.filter(e => e.status === 'COMPLETED').length
    const planning  = entries.filter(e => e.status === 'PLANNING').length
    const paused    = entries.filter(e => e.status === 'PAUSED').length
    const dropped   = entries.filter(e => e.status === 'DROPPED').length

    const totalEps   = entries.reduce((s, e) => s + e.progress, 0)
    const totalMins  = totalEps * 24
    const totalHours = (totalMins / 60).toFixed(1)
    const totalDays  = (totalMins / 60 / 24).toFixed(1)

    const rated   = entries.filter(e => e.userRating != null)
    const avgRating = rated.length
      ? (rated.reduce((s, e) => s + (e.userRating ?? 0), 0) / rated.length).toFixed(1)
      : null

    // Format breakdown
    const formatMap: Record<string, number> = {}
    entries.forEach(e => {
      if (e.format) formatMap[e.format] = (formatMap[e.format] ?? 0) + 1
    })
    const formats = Object.entries(formatMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)

    // Score distribution (1-10)
    const scoreDist = Array.from({ length: 10 }, (_, i) => ({
      label: String(i + 1),
      value: entries.filter(e => e.userRating === i + 1).length,
    }))

    // Top rated
    const topRated = entries
      .filter(e => e.userRating != null)
      .sort((a, b) => (b.userRating ?? 0) - (a.userRating ?? 0))
      .slice(0, 5)

    // Most rewatched
    const mostRewatched = entries
      .filter(e => e.rewatchCount > 0)
      .sort((a, b) => b.rewatchCount - a.rewatchCount)
      .slice(0, 5)

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    return {
      total, watching, completed, planning, paused, dropped,
      totalEps, totalHours, totalDays, avgRating,
      formats, scoreDist, topRated, mostRewatched, completionRate,
      ratedCount: rated.length,
    }
  }, [entries])

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <Tv2 className="h-12 w-12 text-muted-foreground/40" />
        <p className="text-lg font-semibold text-muted-foreground">No anime in your list yet</p>
        <Link href="/browse" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
          Start Browsing
        </Link>
      </div>
    )
  }

  const donutSlices: DonutSlice[] = [
    { label: 'Watching',  value: stats.watching,  color: '#34d399' },
    { label: 'Completed', value: stats.completed, color: 'oklch(0.88 0.11 90)' },
    { label: 'Planning',  value: stats.planning,  color: '#60a5fa' },
    { label: 'Paused',    value: stats.paused,    color: '#fb923c' },
    { label: 'Dropped',   value: stats.dropped,   color: '#f87171' },
  ]

  const scoreMax = Math.max(...stats.scoreDist.map(s => s.value), 1)
  const formatMax = Math.max(...stats.formats.map(f => f[1]), 1)

  const SCORE_COLORS = [
    '#f87171','#fb923c','#facc15','#a3e635','#4ade80',
    '#34d399','#2dd4bf','#38bdf8','#818cf8','oklch(0.88 0.11 90)',
  ]

  return (
    <div className="flex flex-col gap-8">

      {/* ── Summary cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard icon={<Tv2 className="h-4 w-4"/>} label="Anime" value={stats.total} sub="in your list" />
        <StatCard icon={<Eye className="h-4 w-4"/>} label="Episodes" value={stats.totalEps.toLocaleString()} sub="watched" />
        <StatCard icon={<Clock className="h-4 w-4"/>} label="Hours" value={stats.totalHours} sub={`${stats.totalDays} days`} />
        <StatCard icon={<Star className="h-4 w-4"/>} label="Avg Rating" value={stats.avgRating ?? '—'} sub={`${stats.ratedCount} rated`} />
        <StatCard icon={<TrendingUp className="h-4 w-4"/>} label="Completion" value={`${stats.completionRate}%`} sub={`${stats.completed} completed`} />
      </div>

      {/* ── Status + Score dist ─────────────────────────────── */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Status donut */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">Status Breakdown</h2>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <DonutChart slices={donutSlices} total={stats.total} />
            <div className="flex flex-col gap-2.5 text-sm">
              {[
                { label: 'Watching',  val: stats.watching,  color: 'bg-emerald-400', icon: <Eye className="h-3.5 w-3.5 text-emerald-400"/> },
                { label: 'Completed', val: stats.completed, color: 'bg-primary',     icon: <CheckCircle2 className="h-3.5 w-3.5 text-primary"/> },
                { label: 'Planning',  val: stats.planning,  color: 'bg-blue-400',    icon: <BookmarkPlus className="h-3.5 w-3.5 text-blue-400"/> },
                { label: 'Paused',    val: stats.paused,    color: 'bg-orange-400',  icon: <PauseCircle className="h-3.5 w-3.5 text-orange-400"/> },
                { label: 'Dropped',   val: stats.dropped,   color: 'bg-red-400',     icon: <XCircle className="h-3.5 w-3.5 text-red-400"/> },
              ].map(({ label, val, icon }) => (
                <div key={label} className="flex items-center justify-between gap-8">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {icon}
                    <span>{label}</span>
                  </div>
                  <span className="font-bold text-foreground tabular-nums">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Score distribution */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">Your Rating Distribution</h2>
          {stats.ratedCount === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Rate some anime to see your distribution</p>
          ) : (
            <div className="flex h-32 items-end gap-1.5">
              {stats.scoreDist.map(({ label, value }, i) => (
                <div key={label} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[9px] font-bold tabular-nums text-muted-foreground">{value > 0 ? value : ''}</span>
                  <div
                    className="w-full rounded-t-sm transition-all duration-700"
                    style={{
                      height: scoreMax > 0 ? `${Math.max((value / scoreMax) * 100, value > 0 ? 8 : 0)}%` : '0%',
                      background: SCORE_COLORS[i],
                      opacity: value === 0 ? 0.2 : 1,
                    }}
                  />
                  <span className="text-[9px] text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Format breakdown ────────────────────────────────── */}
      {stats.formats.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">Format Breakdown</h2>
          <BarChart data={stats.formats.map(([label, value]) => ({ label, value, max: formatMax }))} />
        </div>
      )}

      {/* ── Top rated + Most rewatched ──────────────────────── */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Top personally rated */}
        {stats.topRated.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <Award className="h-4 w-4 text-primary" /> Your Top Picks
            </h2>
            <ol className="flex flex-col gap-3">
              {stats.topRated.map((e, i) => (
                <li key={e.id}>
                  <Link href={`/anime/${e.animeId}`} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent">
                    <span className="w-5 text-center text-sm font-black text-primary">{i + 1}</span>
                    {e.coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={e.coverImage} alt="" className="h-10 w-7 rounded object-cover" />
                    )}
                    <span className="flex-1 truncate text-sm font-medium">{e.title}</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-primary">
                      <Star className="h-3 w-3 fill-current" />{e.userRating}/10
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Most rewatched */}
        {stats.mostRewatched.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <Eye className="h-4 w-4 text-primary" /> Most Rewatched
            </h2>
            <ol className="flex flex-col gap-3">
              {stats.mostRewatched.map((e, i) => (
                <li key={e.id}>
                  <Link href={`/anime/${e.animeId}`} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent">
                    <span className="w-5 text-center text-sm font-black text-primary">{i + 1}</span>
                    {e.coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={e.coverImage} alt="" className="h-10 w-7 rounded object-cover" />
                    )}
                    <span className="flex-1 truncate text-sm font-medium">{e.title}</span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                      ×{e.rewatchCount}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

    </div>
  )
}
