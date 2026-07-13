import Link from 'next/link'
import { Award, Film, Star, Heart, Compass } from 'lucide-react'

interface StudioCard {
  name: string
  alias: string // search keyword for AniList
  founded: string
  famousWork: string
  description: string
  gradient: string
  avatarChar: string
}

const STUDIO_CARDS: StudioCard[] = [
  {
    name: 'MAPPA',
    alias: 'MAPPA',
    founded: '2011',
    famousWork: 'Jujutsu Kaisen, Attack on Titan',
    description: 'Renowned for high-octane modern action sequences and detailed characters.',
    gradient: 'from-red-950/40 via-red-900/10 to-transparent hover:border-red-500/30',
    avatarChar: 'M',
  },
  {
    name: 'ufotable',
    alias: 'ufotable',
    founded: '2000',
    famousWork: 'Demon Slayer, Fate/Zero',
    description: 'Pioneers of visual effects, blending 3D CGI and traditional 2D animation.',
    gradient: 'from-blue-950/40 via-blue-900/10 to-transparent hover:border-blue-500/30',
    avatarChar: 'U',
  },
  {
    name: 'Wit Studio',
    alias: 'WIT Studio',
    founded: '2012',
    famousWork: 'Vinland Saga, Spy x Family',
    description: 'Acclaimed for rich worldbuilding, visual storytelling, and hand-drawn detail.',
    gradient: 'from-amber-950/40 via-amber-900/10 to-transparent hover:border-amber-500/30',
    avatarChar: 'W',
  },
  {
    name: 'Kyoto Animation',
    alias: 'Kyoto Animation',
    founded: '1985',
    famousWork: 'Violet Evergarden, Silent Voice',
    description: 'Masters of emotional narratives, character designs, and slice-of-life realism.',
    gradient: 'from-purple-950/40 via-purple-900/10 to-transparent hover:border-purple-500/30',
    avatarChar: 'K',
  },
  {
    name: 'Studio Ghibli',
    alias: 'Studio Ghibli',
    founded: '1985',
    famousWork: 'Spirited Away, Totoro',
    description: 'Legends of theatrical animation, hand-painted backdrops, and timeless stories.',
    gradient: 'from-emerald-950/40 via-emerald-900/10 to-transparent hover:border-emerald-500/30',
    avatarChar: 'G',
  },
]

export function StudioShowcase() {
  return (
    <section aria-label="Studio Showcase" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Award className="h-6 w-6 text-primary fill-primary/20" /> Studio Hall of Fame
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Meet the legendary animation studios behind the masterpieces.</p>
        </div>
        <Link href="/browse" className="text-xs font-bold text-primary hover:underline">
          Explore Database &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STUDIO_CARDS.map((studio) => (
          <Link
            key={studio.name}
            href={`/browse?search=${encodeURIComponent(studio.alias)}`}
            className={`group relative flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-gradient-to-br p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl ${studio.gradient}`}
          >
            <div>
              {/* Studio Monogram / Avatar */}
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-background/60 border border-white/[0.04] text-lg font-black text-primary group-hover:scale-105 transition-transform">
                  {studio.avatarChar}
                </span>
                <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[9px] font-bold text-primary uppercase tracking-wider">
                  Est. {studio.founded}
                </span>
              </div>

              {/* Title & description */}
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {studio.name}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                {studio.description}
              </p>
            </div>

            {/* Famous Works badge bar */}
            <div className="mt-5 pt-3 border-t border-white/[0.04] flex flex-col gap-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Famous Works:</span>
              <span className="text-xs font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {studio.famousWork}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
