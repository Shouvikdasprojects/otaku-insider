'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Flame, Star, Compass, Layers, Info, Rss, ArrowRight, Code, Mail, Link2 } from 'lucide-react'

export function Footer() {
  const profileUrl = 'https://www.instagram.com/theotakuinsider?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='

  return (
    <footer className="border-t border-white/[0.06] bg-card relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-600/5 blur-3xl" />

      {/* Top Banner (Join community) */}
      <div className="border-b border-white/[0.06] relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Rss className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold text-foreground">Stay Updated</p>
              <p className="text-xs text-muted-foreground mt-0.5">Subscribe to our newsletter for seasonal release updates.</p>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-sm items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="h-10 flex-1 rounded-xl border border-border bg-secondary/50 px-4 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="flex h-10 items-center gap-1.5 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground transition-all hover:opacity-90"
            >
              Subscribe <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid grid-cols-1 gap-10 md:grid-cols-5 relative z-10">
        {/* Brand Column */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded-full ring-2 ring-primary/20" />
            <span className="text-xl font-black tracking-tight">
              Otaku <span className="text-primary glow-text">Insider</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed text-pretty max-w-sm">
            Discover, track, and share your favorite anime. Stay updated with real-time seasonal lineups, countdown schedules, and custom watch analytics.
          </p>
          {/* Social Links */}
          <div className="flex items-center gap-3 mt-2">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary/50 text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground hover:scale-105"
              aria-label="Instagram"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Explore */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary">Explore</h3>
          <ul className="flex flex-col gap-2 text-xs">
            <li>
              <Link href="/browse" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5" /> Browse Database
              </Link>
            </li>
            <li>
              <Link href="/seasonal" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" /> Seasonal Anime
              </Link>
            </li>
            <li>
              <Link href="/genres" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" /> Anime Genres
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Stats & Schedule */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary">Top Lists</h3>
          <ul className="flex flex-col gap-2 text-xs">
            <li>
              <Link href="/browse?sort=SCORE_DESC" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5" /> Top Rated
              </Link>
            </li>
            <li>
              <Link href="/browse?sort=TRENDING_DESC" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5" /> Trending Now
              </Link>
            </li>
            <li>
              <Link href="/schedule" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5" /> Airing Calendar
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary">Data Sources</h3>
          <ul className="flex flex-col gap-2 text-xs">
            <li>
              <a href="https://anilist.co" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" /> AniList GraphQL API
              </a>
            </li>
          </ul>
        </div>

        {/* Column 5: Developer Details */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary">Developer</h3>
          <ul className="flex flex-col gap-2 text-xs">
            <li className="font-semibold text-foreground flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5 text-primary" /> Shouvik Das
            </li>
            <li>
              <a href="https://shouvikdas-portfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
                <Link2 className="h-3.5 w-3.5" /> Portfolio
              </a>
            </li>
            <li>
              <a href="mailto:shouvikdaswork@gmail.com" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
                <Mail className="h-3.5 w-3.5" /> Contact Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/[0.06] py-5 relative z-10">
        <p className="text-center text-[10px] text-muted-foreground leading-normal px-4">
          &copy; {new Date().getFullYear()} Otaku Insider. Anime database powered by AniList. All assets belong to their respective creators.
        </p>
      </div>
    </footer>
  )
}
