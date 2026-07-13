import type { MetadataRoute } from 'next'

const base = process.env.CF_PAGES_URL
  ? process.env.CF_PAGES_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000'

const STATIC: { path: string; freq: MetadataRoute.Sitemap[0]['changeFrequency']; priority: number }[] = [
  { path: '/',         freq: 'daily',   priority: 1.0 },
  { path: '/browse',   freq: 'hourly',  priority: 0.9 },
  { path: '/seasonal', freq: 'weekly',  priority: 0.9 },
  { path: '/schedule', freq: 'daily',   priority: 0.8 },
  { path: '/top',      freq: 'daily',   priority: 0.8 },
  { path: '/awards',   freq: 'monthly', priority: 0.7 },
  { path: '/genres',   freq: 'monthly', priority: 0.7 },
  { path: '/news',     freq: 'daily',   priority: 0.8 },
  { path: '/sign-in',  freq: 'yearly',  priority: 0.3 },
  { path: '/sign-up',  freq: 'yearly',  priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC.map(({ path, freq, priority }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }))
}
