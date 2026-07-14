

import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSessionUser } from '@/lib/auth-helper'
import { db } from '@/lib/db'
import { watchlist, review } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { Mail, Calendar, Shield, BookmarkCheck, Heart, MessageSquare, Award } from '@/components/icons'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'

const EditProfileForm = dynamic(() => import('@/components/edit-profile-form').then(mod => mod.EditProfileForm))
const SignOutButton = dynamic(() => import('@/components/sign-out-button').then(mod => mod.SignOutButton))

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

  // Fetch real user stats and data
  const [watchlistItems, reviews] = await Promise.all([
    db.select().from(watchlist).where(eq(watchlist.userId, user.id)),
    db.select().from(review).where(eq(review.userId, user.id)).orderBy(review.createdAt),
  ])

  // Extract Top Anime (score 9 or 10)
  const topAnime = watchlistItems
    .filter(item => item.userRating && item.userRating >= 9)
    .sort((a, b) => (b.userRating || 0) - (a.userRating || 0))

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 relative overflow-hidden">
      {/* Background ambient lights */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-purple-600/5 blur-3xl" />

      {/* ── Profile header ─────────────────────────────────────── */}
      <div className="mb-10 flex flex-col items-center text-center relative z-10">
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
        
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold text-primary flex items-center gap-1">
            <Award className="h-3.5 w-3.5" /> Gold Member
          </span>
          <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-bold text-purple-400 flex items-center gap-1">
            <BookmarkCheck className="h-3.5 w-3.5" /> {watchlistItems.length} Anime Tracked
          </span>
          <span className="rounded-full bg-pink-500/10 border border-pink-500/20 px-3 py-1 text-xs font-bold text-pink-400 flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" /> {reviews.length} Reviews
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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Stats & Settings */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <Section title="Edit Display Name">
            <EditProfileForm initialName={user.name} />
          </Section>

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
                    Verified
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
                  <p className="font-mono text-xs text-muted-foreground truncate w-32">{user.id}</p>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Active Session">
            <div className="flex flex-col gap-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Sign out from your current device session. Your local preferences will remain saved on this browser.
              </p>
              <SignOutButton />
            </div>
          </Section>
        </div>

        {/* Right Column: Top Anime & Reviews */}
        <div className="md:col-span-7 flex flex-col gap-6">
          
          {/* Top Anime Showcase */}
          <Section title="My Top Anime">
            {topAnime.length === 0 ? (
              <div className="text-center py-6">
                <Heart className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">You haven't rated any anime a 9 or 10 yet.</p>
                <Link href="/watchlist" className="text-xs font-bold text-primary mt-2 inline-block hover:underline">
                  Rate anime in your Watchlist &rarr;
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {topAnime.slice(0, 6).map(anime => (
                  <Link key={anime.animeId} href={`/anime/${anime.animeId}`} className="group relative rounded-xl overflow-hidden aspect-[3/4] border border-white/[0.04]">
                    {anime.coverImage ? (
                      <img src={anime.coverImage} alt={anime.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-secondary" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 w-full p-3 flex flex-col items-center text-center">
                      <span className="text-[10px] font-black text-primary drop-shadow-md">{anime.userRating}/10</span>
                      <span className="text-xs font-bold text-white line-clamp-2 leading-tight drop-shadow-md">{anime.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Section>

          {/* My Reviews Section */}
          <Section title="My Reviews">
            {reviews.length === 0 ? (
              <div className="text-center py-6">
                <MessageSquare className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">You haven't written any reviews yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {reviews.map(rev => (
                  <div key={rev.id} className="relative rounded-xl border border-white/[0.06] bg-card p-4 transition-all hover:bg-secondary/20">
                    <div className="flex gap-4">
                      <Link href={`/anime/${rev.animeId}`} className="shrink-0">
                        {rev.animeCover ? (
                          <img src={rev.animeCover} alt={rev.animeTitle} className="w-12 h-16 rounded-md object-cover shadow-md" />
                        ) : (
                          <div className="w-12 h-16 rounded-md bg-secondary" />
                        )}
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link href={`/anime/${rev.animeId}`} className="text-sm font-bold text-foreground hover:text-primary transition-colors line-clamp-1">
                              {rev.animeTitle}
                            </Link>
                            <span className="text-[10px] font-bold text-primary mt-0.5 inline-block">Score: {rev.rating}/10</span>
                          </div>
                          {/* Delete Action placeholder - implemented as a client component ideally, but for now just link to anime page to edit/delete */}
                          <Link href={`/anime/${rev.animeId}#reviews`} className="text-[10px] font-bold text-muted-foreground hover:text-white transition-colors bg-secondary/50 px-2 py-1 rounded">
                            Edit
                          </Link>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                          "{rev.content}"
                        </p>
                        <p className="text-[9px] text-muted-foreground mt-2 uppercase tracking-widest font-bold">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

        </div>
      </div>
    </main>
  )
}
