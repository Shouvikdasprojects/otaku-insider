import Link from 'next/link'
import { Swords, Sparkles, Heart, Zap, Compass, Ghost, Smile, Brain } from 'lucide-react'

interface GenreCard {
  name: string
  description: string
  gradient: string
  icon: React.ReactNode
}

const GENRE_CARDS: GenreCard[] = [
  {
    name: 'Action',
    description: 'High-octane fights, intense battles, and thrilling sequences.',
    gradient: 'from-orange-600/30 to-red-600/10 hover:border-orange-500/40',
    icon: <Swords className="h-6 w-6 text-orange-400" />,
  },
  {
    name: 'Fantasy',
    description: 'Magic, mythical beasts, and expansive fantasy worlds.',
    gradient: 'from-purple-600/30 to-indigo-600/10 hover:border-purple-500/40',
    icon: <Sparkles className="h-6 w-6 text-purple-400" />,
  },
  {
    name: 'Romance',
    description: 'Heartwarming stories of love, relationships, and drama.',
    gradient: 'from-pink-600/30 to-rose-600/10 hover:border-pink-500/40',
    icon: <Heart className="h-6 w-6 text-pink-400" />,
  },
  {
    name: 'Sci-Fi',
    description: 'Futuristic tech, space exploration, and cyberpunk cities.',
    gradient: 'from-cyan-600/30 to-blue-600/10 hover:border-cyan-500/40',
    icon: <Zap className="h-6 w-6 text-cyan-400" />,
  },
  {
    name: 'Comedy',
    description: 'Hilarious situations, comedy tropes, and lighthearted fun.',
    gradient: 'from-yellow-600/30 to-amber-600/10 hover:border-yellow-500/40',
    icon: <Smile className="h-6 w-6 text-yellow-400" />,
  },
  {
    name: 'Mystery',
    description: 'Suspenseful investigations, dark secrets, and puzzle solving.',
    gradient: 'from-teal-600/30 to-emerald-600/10 hover:border-teal-500/40',
    icon: <Ghost className="h-6 w-6 text-teal-400" />,
  },
  {
    name: 'Psychological',
    description: 'Mind-bending plots, mental battles, and deep characters.',
    gradient: 'from-red-600/30 to-purple-600/10 hover:border-red-500/40',
    icon: <Brain className="h-6 w-6 text-rose-500" />,
  },
  {
    name: 'Adventure',
    description: 'Grand journeys, exploring unknown lands, and epic quests.',
    gradient: 'from-blue-600/30 to-teal-600/10 hover:border-blue-500/40',
    icon: <Compass className="h-6 w-6 text-blue-400" />,
  },
]

export function GenreSpotlight() {
  return (
    <section aria-label="Genre Spotlight" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Genre Spotlight</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Explore curated anime titles across popular categories.</p>
        </div>
        <Link href="/genres" className="text-xs font-bold text-primary hover:underline">
          View All Genres &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {GENRE_CARDS.map((card) => (
          <Link
            key={card.name}
            href={`/browse?genre=${encodeURIComponent(card.name)}`}
            className={`group relative flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-gradient-to-br p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl ${card.gradient}`}
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-background/50 border border-white/[0.04]">
                {card.icon}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                Explore &rarr;
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {card.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
