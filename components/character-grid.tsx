import { AnimeMedia } from '@/lib/anilist'

interface CharacterEdge {
  role: string
  node: { id: number; name: { full: string }; image: { large: string | null } }
  voiceActors: { id: number; name: { full: string }; image: { large: string | null } }[]
}

export function CharacterGrid({ characters }: { characters: AnimeMedia['characters'] }) {
  if (!characters?.edges?.length) return null

  const edges = characters.edges.filter((e) => e.node)

  return (
    <section aria-label="Characters" className="flex flex-col gap-4">
      <h2 className="text-xl font-bold tracking-tight">Characters &amp; Cast</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {edges.map((edge) => {
          const char = edge.node
          const va   = edge.voiceActors?.[0]
          return (
            <div
              key={char.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-white/[0.1]"
            >
              {/* Character */}
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                {char.image?.large ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={char.image.large}
                    alt=""
                    className="h-12 w-9 shrink-0 rounded-lg object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-12 w-9 shrink-0 rounded-lg bg-secondary" />
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold leading-tight">{char.name.full}</p>
                  <p className="text-[11px] text-muted-foreground capitalize">{edge.role.toLowerCase()}</p>
                </div>
              </div>

              {/* Voice Actor */}
              {va && (
                <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-end">
                  <div className="min-w-0 text-right">
                    <p className="truncate text-sm font-semibold leading-tight">{va.name.full}</p>
                    <p className="text-[11px] text-muted-foreground">VA (JP)</p>
                  </div>
                  {va.image?.large ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={va.image.large}
                      alt=""
                      className="h-12 w-9 shrink-0 rounded-lg object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-12 w-9 shrink-0 rounded-lg bg-secondary" />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
