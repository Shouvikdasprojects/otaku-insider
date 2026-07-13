export const runtime = 'edge'

import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSessionUser } from '@/lib/auth-helper'
import { db } from '@/lib/db'
import { watchlist, review } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { Mail, Calendar, Shield, BookmarkCheck, Heart, MessageSquare, Award } from 'lucide-react'
import { EditProfileForm } from '@/components/edit-profile-form'
import { SignOutButton } from '@/components/sign-out-button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Profile — Otaku Insider',
  description: 'Manage your Otaku Insider account settings and profile.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-card/85 to-card/45 backdrop-blur-md shadow-xl transition-all hover:border-white/[0.12]">
      <div className="border-b border-white/[0.06] px-6 py-4">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
          {title}
        </h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  )
}

export default async function ProfilePage() {
  const user = await getSessionUser()
  if (!user) redirect('/sign-in')
  const initial = (user.name || user.email || '?').charAt(0).toUpperCase()
  const memberSince = new Date(user.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  // Fetch real user stats for profile page personalization
  const [watchlistCount, reviewsCount] = await Promise.all([
    db.select().from(watchlist).where(eq(watchlist.userId, user.id)),
    db.select().from(review).where(eq(review.userId, user.id)),
  ])

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 relative overflow-hidden">
      {/* Background ambient lights */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-purple-600/5 blur-3xl" />

      {/* ── Profile header ─────────────────────────────────────── */}
      <div className="mb-10 flex flex-col items-center text-center relative z-10">
        {/* Instagram/Otaku styled profile photo frame */}
        <div className="relative group mb-4">
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-yellow-500 via-primary to-purple-600 animate-spin duration-10000 opacity-90 blur-[2px]" />
          <div
            className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-card text-4xl font-black text-foreground"
          >
            {initial}
          </div>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-foreground">{user.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        
        {/* Badges bar */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold text-primary flex items-center gap-1">
            <Award className="h-3.5 w-3.5" /> Gold Member
          </span>
          <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-bold text-purple-400 flex items-center gap-1">
            <BookmarkCheck className="h-3.5 w-3.5" /> {watchlistCount.length} Anime Tracked
          </span>
          <span className="rounded-full bg-pink-500/10 border border-pink-500/20 px-3 py-1 text-xs font-bold text-pink-400 flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" /> {reviewsCount.length} Reviews
          </span>
        </div>

        <Link
          href="/watchlist"
          className="mt-6 flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:opacity-90 glow-primary"
        >
          <BookmarkCheck className="h-4 w-4 fill-current" />
          Go to My Watchlist
        </Link>
      </div>

      <div className="flex flex-col gap-6 relative z-10">

        {/* ── Edit profile ─────────────────────────────────────── */}
        <Section title="Edit Display Name">
          <EditProfileForm initialName={user.name} />
        </Section>

        {/* ── Account info ──────────────────────────────────────── */}
        <Section title="Account Metadata">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/50">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Registered Email</p>
                <p className="text-sm text-foreground">{user.email}</p>
              </div>
              {user.emailVerified && (
                <span className="ml-auto rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-400">
                  Verified Account
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/50">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Member Since</p>
                <p className="text-sm text-foreground">{memberSince}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/50">
                <Shield className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Unique User ID</p>
                <p className="font-mono text-xs text-muted-foreground">{user.id}</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Danger zone ───────────────────────────────────────── */}
        <Section title="Active Session">
          <div className="flex flex-col gap-4">
            <p className="text-xs text-muted-foreground">
              Sign out from your current device session. Your local preferences (like theme and recently viewed list) will remain saved on this browser.
            </p>
            <SignOutButton />
          </div>
        </Section>

      </div>
    </main>
  )
}
