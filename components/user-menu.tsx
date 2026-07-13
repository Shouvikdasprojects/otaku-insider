'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BookmarkCheck, BarChart3, Download, LogOut, UserRound } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function UserMenu() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-secondary" aria-hidden="true" />
  }

  if (!session?.user) {
    return (
      <Button
        size="sm"
        className="shrink-0"
        nativeButton={false}
        render={<Link href="/sign-in" />}
      >
        Sign In
      </Button>
    )
  }

  const initial = (session.user.name || session.user.email || '?').charAt(0).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground glow-primary"
        aria-label="Account menu"
      >
        {initial}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col">
            <span className="font-medium">{session.user.name}</span>
            <span className="text-xs font-normal text-muted-foreground">{session.user.email}</span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/profile" />}>
          <UserRound className="size-4" aria-hidden="true" />
          My Profile
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/watchlist" />}>
          <BookmarkCheck className="size-4" aria-hidden="true" />
          My Watchlist
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/stats" />}>
          <BarChart3 className="size-4" aria-hidden="true" />
          My Stats
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/import" />}>
          <Download className="size-4" aria-hidden="true" />
          Import Watchlist
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await authClient.signOut()
            router.push('/')
            router.refresh()
          }}
        >
          <LogOut className="size-4" aria-hidden="true" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
