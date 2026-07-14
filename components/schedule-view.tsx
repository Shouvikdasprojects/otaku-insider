'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, Timer } from 'lucide-react'
import { displayTitle, formatStatus, type AiringScheduleItem } from '@/lib/anilist'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

interface DayGroup {
  key: string
  label: string
  isToday: boolean
  items: AiringScheduleItem[]
}

// ── Live countdown ─────────────────────────────────────────────────────────

function Countdown({ airingAt }: { airingAt: number }) {
  const [mounted, setMounted] = useState(false)
  const [remaining, setRemaining] = useState(0)

  useEffect(() => {
    setMounted(true)
    setRemaining(airingAt * 1000 - Date.now())
    const id = setInterval(() => setRemaining(airingAt * 1000 - Date.now()), 1000)
    return () => clearInterval(id)
  }, [airingAt])

  if (!mounted) {
    return (
      <span className="flex items-center gap-1 rounded-md bg-primary/5 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-transparent">
        <Timer className="h-2.5 w-2.5 text-primary/30" />
        00h 00m 00s
      </span>
    )
  }

  if (remaining <= 0) {
    return (
      <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
        Aired
      </span>
    )
  }

  const h = Math.floor(remaining / 3_600_000)
  const m = Math.floor((remaining % 3_600_000) / 60_000)
  const s = Math.floor((remaining % 60_000) / 1_000)

  return (
    <span className="flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-primary">
      <Timer className="h-2.5 w-2.5" />
      {h > 0 ? `${h}h ` : ''}{m}m {String(s).padStart(2, '0')}s
    </span>
  )
}

// ── Schedule view ──────────────────────────────────────────────────────────

export function ScheduleView({ schedules }: { schedules: AiringScheduleItem[] }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const days = useMemo<DayGroup[]>(() => {
    // If not mounted, just return a dummy set of days based on a fixed offset to avoid hydration mismatch
    // Actually, on the server, we can just use the current UTC date, and client uses local. 
    // To strictly avoid hydration mismatch, we delay the `new Date()` evaluation until mounted,
    // or just render the server's version and suppress warning.
    // The safest is to use the server's date until mounted!
    const now = new Date() // During SSR this is server time. Client hydration uses client time.
    const todayKey = now.toDateString()
    const groups: DayGroup[] = []

    for (let offset = 0; offset < 7; offset++) {
      const date = new Date(now)
      date.setDate(now.getDate() + offset)
      const key = date.toDateString()
      const label =
        offset === 0
          ? 'Today'
          : offset === 1
            ? 'Tomorrow'
            : DAY_NAMES[date.getDay()]

      const items = schedules
        .filter((s) => new Date(s.airingAt * 1000).toDateString() === key)
        .sort((a, b) => a.airingAt - b.airingAt)

      groups.push({ key, label, isToday: key === todayKey, items })
    }
    return groups
  }, [schedules])

  const [activeKey, setActiveKey] = useState(() => days[0]?.key ?? '')
  const active = days.find((d) => d.key === activeKey) ?? days[0]

  // If not mounted, render a skeleton to avoid ANY chance of structural hydration crash
  if (!mounted) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="h-9 w-24 shrink-0 rounded-full bg-secondary/50" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-32 rounded-xl bg-secondary/30" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Day of week">
        {days.map((day) => (
          <button
            key={day.key}
            type="button"
            role="tab"
            aria-selected={day.key === active?.key}
            onClick={() => setActiveKey(day.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              day.key === active?.key
                ? 'bg-primary text-primary-foreground glow-primary'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {day.label}
            <span className="ml-2 text-xs opacity-70">{day.items.length}</span>
          </button>
        ))}
      </div>

      {active && active.items.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">No episodes scheduled for this day.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {active?.items.map((item) => (
            <ScheduleCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Schedule card ──────────────────────────────────────────────────────────

function ScheduleCard({ item }: { item: AiringScheduleItem }) {
  const anime = item.media
  const title = displayTitle(anime)
  const cover = anime.coverImage.large || anime.coverImage.extraLarge
  const airTime = new Date(item.airingAt * 1000).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <Link
      href={`/anime/${anime.id}`}
      className="card-3d group flex gap-4 overflow-hidden rounded-xl border border-border bg-card p-3"
    >
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt=""
          className="h-24 w-16 shrink-0 rounded-lg object-cover"
          loading="lazy"
        />
      ) : (
        <div className="h-24 w-16 shrink-0 rounded-lg bg-secondary" aria-hidden="true" />
      )}
      <div className="flex min-w-0 flex-col justify-center gap-1.5">
        <p className="truncate text-sm font-semibold group-hover:text-primary transition-colors">
          {title}
        </p>
        <p className="text-xs text-muted-foreground">
          Episode {item.episode}
          {anime.episodes ? ` / ${anime.episodes}` : ''} · {formatStatus(anime.status)}
        </p>
        <p className="flex items-center gap-1.5 text-xs font-medium text-accent-foreground">
          <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          {airTime}
        </p>
        <div>
          <Countdown airingAt={item.airingAt} />
        </div>
      </div>
    </Link>
  )
}
