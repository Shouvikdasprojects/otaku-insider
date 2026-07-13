'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Bookmark, BookmarkCheck, ChevronDown, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistStatus,
  type WatchStatus,
} from '@/app/actions/watchlist'

const STATUSES: { value: WatchStatus; label: string }[] = [
  { value: 'WATCHING', label: 'Watching' },
  { value: 'PLANNING', label: 'Plan to Watch' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'PAUSED', label: 'Paused' },
  { value: 'DROPPED', label: 'Dropped' },
]

export function WatchlistButton({
  anime,
  isAuthed,
  currentStatus,
}: {
  anime: {
    id: number
    title: string
    coverImage?: string | null
    format?: string | null
    episodes?: number | null
    averageScore?: number | null
  }
  isAuthed: boolean
  currentStatus: WatchStatus | null
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [optimisticStatus, setOptimisticStatus] = useState<WatchStatus | null>(currentStatus)

  if (!isAuthed) {
    return (
      <Button
        variant="outline"
        className="gap-2 bg-transparent"
        onClick={() => router.push('/sign-in')}
      >
        <Bookmark className="size-4" aria-hidden="true" />
        Sign in to track
      </Button>
    )
  }

  const setStatus = (status: WatchStatus) => {
    setOptimisticStatus(status)
    startTransition(async () => {
      if (optimisticStatus === null) {
        await addToWatchlist({
          animeId: anime.id,
          title: anime.title,
          coverImage: anime.coverImage,
          format: anime.format,
          episodes: anime.episodes,
          averageScore: anime.averageScore,
          status,
        })
        if (status !== 'PLANNING') await updateWatchlistStatus(anime.id, status)
      } else {
        await updateWatchlistStatus(anime.id, status)
      }
      router.refresh()
    })
  }

  const remove = () => {
    setOptimisticStatus(null)
    startTransition(async () => {
      await removeFromWatchlist(anime.id)
      router.refresh()
    })
  }

  const activeLabel = STATUSES.find((s) => s.value === optimisticStatus)?.label

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant={optimisticStatus ? 'default' : 'outline'}
            disabled={isPending}
            className={`gap-2 ${optimisticStatus ? '' : 'bg-transparent'}`}
          />
        }
      >
        {optimisticStatus ? (
          <BookmarkCheck className="size-4" aria-hidden="true" />
        ) : (
          <Bookmark className="size-4" aria-hidden="true" />
        )}
        {optimisticStatus ? activeLabel : 'Add to Watchlist'}
        <ChevronDown className="size-4" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {STATUSES.map((s) => (
          <DropdownMenuItem
            key={s.value}
            onClick={() => setStatus(s.value)}
            className={optimisticStatus === s.value ? 'font-semibold text-primary' : ''}
          >
            {s.label}
          </DropdownMenuItem>
        ))}
        {optimisticStatus && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={remove} className="text-destructive">
              <Trash2 className="size-4" aria-hidden="true" />
              Remove
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
