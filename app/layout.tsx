import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Outfit, Space_Mono } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { BackToTop } from '@/components/back-to-top'
import { KeyboardShortcuts } from '@/components/keyboard-shortcuts'
import { PwaInstall } from '@/components/pwa-install'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

export const metadata: Metadata = {
  title: 'Otaku Insider — Discover, Track & Watch Anime',
  description:
    'Otaku Insider is your anime discovery hub. Explore trending series, seasonal lineups, top-rated anime by genre, trailers, and episodes — powered by the AniList GraphQL API.',
  generator: 'v0.app',
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#141310',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${outfit.variable} ${spaceMono.variable}`}>
      <body className="antialiased font-sans min-h-dvh flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
          <KeyboardShortcuts />
          <PwaInstall />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
