import { getNewsArticleById } from '@/app/actions/news'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ArrowLeft, Globe, Rss } from 'lucide-react'
import type { Metadata } from 'next'

interface Params {
  id: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params
  const article = await getNewsArticleById(id)
  if (!article) return { title: 'Article Not Found — Otaku Insider' }
  return {
    title: `${article.title} — Otaku Insider`,
    description: article.description,
  }
}

export default async function ArticleDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params
  const article = await getNewsArticleById(id)

  if (!article) {
    notFound()
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 relative overflow-hidden">
      {/* Background glow ambient */}
      <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      {/* Back button */}
      <div className="mb-8 relative z-10">
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to News Hub
        </Link>
      </div>

      <article className="relative z-10 flex flex-col gap-6">
        {/* Header Metadata */}
        <div className="flex flex-col gap-3 border-b border-white/[0.06] pb-6">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span className="text-primary flex items-center gap-1">
              <Rss className="h-3.5 w-3.5" /> {article.source}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {article.pubDate}
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl leading-tight">
            {article.title}
          </h1>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-base space-y-4">
          {/* Renders the full article details cleanly */}
          <p className="whitespace-pre-line">{article.content}</p>
        </div>

        {/* External Link Connection */}
        {article.link !== '#' && (
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-foreground">Verify Source</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Read this announcement directly on the official publisher website.</p>
            </div>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary/50 px-5 py-2.5 text-xs font-semibold hover:bg-accent transition-colors"
            >
              <Globe className="h-3.5 w-3.5" /> Visit Original Publisher Website
            </a>
          </div>
        )}
      </article>
    </main>
  )
}
