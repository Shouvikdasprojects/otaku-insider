import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/profile', '/watchlist', '/stats', '/import'],
    },
    sitemap: `${process.env.CF_PAGES_URL
      ? process.env.CF_PAGES_URL
      : process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : 'http://localhost:3000'}/sitemap.xml`,
  }
}
