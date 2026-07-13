'use client'

import { useState } from 'react'
import { Play, Heart, MessageCircle, Layers, Radio, ExternalLink } from 'lucide-react'

interface InstaItem {
  id: string
  type: 'post' | 'reel' | 'story'
  thumbnail: string
  likes: string
  comments: string
  caption: string
}

export function InstagramFeedClient({
  initialItems,
  followers,
  postsCount,
}: {
  initialItems: InstaItem[]
  followers: string
  postsCount: string
}) {
  const [activeTab, setActiveTab] = useState<'all' | 'posts' | 'reels' | 'stories'>('all')

  const filteredItems = initialItems.filter((item) => {
    if (activeTab === 'all') return true
    if (activeTab === 'posts') return item.type === 'post'
    if (activeTab === 'reels') return item.type === 'reel'
    if (activeTab === 'stories') return item.type === 'story'
    return true
  })

  const profileUrl = 'https://www.instagram.com/theotakuinsider?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='

  return (
    <section aria-label="Instagram Feed" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-card/80 to-card/30 p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-purple-600/10 blur-3xl" />

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/60 pb-6 mb-6">
          <div className="flex items-center gap-4">
            {/* Animated Profile Ring */}
            <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="relative group shrink-0">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 animate-spin duration-10000 opacity-80 blur-[2px] group-hover:opacity-100" />
              <div className="relative h-16 w-16 rounded-full border-2 border-background overflow-hidden bg-secondary">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white font-bold text-xl">
                  OI
                </div>
              </div>
            </a>

            <div>
              <div className="flex items-center gap-2">
                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="font-black text-lg hover:text-primary transition-colors flex items-center gap-1.5">
                  @theotakuinsider <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
                <span className="rounded-full bg-pink-500/10 px-2 py-0.5 text-[10px] font-bold text-pink-400 uppercase tracking-widest flex items-center gap-1">
                  <Radio className="h-3 w-3 animate-pulse" /> Live Feed
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Your ultimate companion for everything Anime &amp; Manga.</p>
              <div className="flex gap-4 mt-2 text-xs font-semibold text-foreground/80">
                <span><strong className="text-foreground">{postsCount}</strong> posts</span>
                <span><strong className="text-foreground">{followers}</strong> followers</span>
                <span><strong className="text-foreground">42</strong> following</span>
              </div>
            </div>
          </div>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-500/20 transition-all hover:scale-105 hover:shadow-pink-500/35"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
            Follow on Instagram
          </a>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'posts', 'reels', 'stories'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === t
                  ? 'bg-foreground text-background shadow-md'
                  : 'bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {filteredItems.map((item) => (
            <a
              key={item.id}
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-secondary border border-border/40 transition-transform hover:-translate-y-1"
            >
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.thumbnail}
                alt={item.caption}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover overlay with likes/comments */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4 text-white text-center">
                <div className="flex gap-4 text-sm font-black">
                  <span className="flex items-center gap-1"><Heart className="h-4 w-4 fill-current text-pink-500" /> {item.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="h-4 w-4 fill-current" /> {item.comments}</span>
                </div>
                <p className="text-[10px] leading-tight line-clamp-3 text-white/90 font-medium">{item.caption}</p>
              </div>

              {/* Tag Badges */}
              <span className="absolute top-2 right-2 rounded-lg bg-black/60 p-1.5 text-white backdrop-blur-sm z-10">
                {item.type === 'reel' && <Play className="h-3.5 w-3.5 fill-current" />}
                {item.type === 'story' && <Radio className="h-3.5 w-3.5" />}
                {item.type === 'post' && <Layers className="h-3.5 w-3.5" />}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
