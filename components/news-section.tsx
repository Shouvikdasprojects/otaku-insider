import { fetchLatestNews } from '@/app/actions/news'
import Link from 'next/link'
import { Rss, Calendar, ArrowRight } from 'lucide-react'

export async function NewsSection() {
  const articles = await fetchLatestNews()
  const displayArticles = articles.slice(0, 4) // Show top 4 on homepage

  return (
    <section aria-label="Latest Anime News" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Rss className="h-6 w-6 text-primary" /> Latest Anime News
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Stay informed with the latest industry announcements and headlines.</p>
        </div>
        <Link
          href="/news"
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
        >
          Read More News <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {displayArticles.map((art) => (
          <Link
            key={art.id}
            href={`/news/${art.id}`}
            className="group flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-card p-5 transition-all hover:border-white/[0.12] hover:bg-secondary/20 hover:shadow-lg"
          >
            <div className="flex flex-col gap-2">
              {/* Source & Date Badge */}
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <span className="text-primary">{art.source}</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {art.pubDate}
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                {art.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {art.description}
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-bold text-muted-foreground group-hover:text-primary transition-colors">
              <span>Read Full Article</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
