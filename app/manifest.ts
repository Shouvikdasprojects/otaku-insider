import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Otaku Insider',
    short_name: 'Otaku Insider',
    description:
      'Discover, track & watch anime — powered by the AniList GraphQL API.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    theme_color: '#141310',
    background_color: '#141310',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['entertainment'],
    screenshots: [],
  }
}
