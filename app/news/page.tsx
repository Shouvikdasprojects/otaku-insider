import { fetchLatestNews } from '@/app/actions/news'
import Link from 'next/link'
import { Rss, Calendar, ArrowRight, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anime News Hub — Otaku Insider',
  description: 'Stay updated with latest anime industry announcements, release dates, and shonen shueisha updates.',
}

export default async function NewsPage() {
  const articles = await fetchLatestNews()

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-purple-600/5 blur-3xl" />

      {/* Header */}
      <div className="mb-10 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </Link>
        <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-2">
          <Rss className="h-7 w-7 text-primary" /> Anime News Hub
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Explore real-time industry announcements, press releases, and articles.
        </p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 relative z-10">
        {articles.map((art) => (
          <Link
            key={art.id}
            href={`/news/${art.id}`}
            className="group flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-card p-6 transition-all hover:border-white/[0.12] hover:bg-secondary/20 hover:shadow-xl"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <span className="text-primary">{art.source}</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {art.pubDate}
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                {art.title}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {art.description}
              </p>
            </div>
            
            <div className="mt-5 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
              <span>Read Full Article</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
