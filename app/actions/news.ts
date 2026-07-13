'use server'

export interface NewsArticle {
  id: string
  title: string
  link: string
  pubDate: string
  description: string
  content: string
  source: string
}

const FALLBACK_NEWS: NewsArticle[] = [
  {
    id: 'demon-slayer-hashira-training',
    title: 'Demon Slayer: Hashira Training Arc Movie Trilogy Announced',
    link: '#',
    pubDate: 'July 12, 2026',
    description: 'Ufotable confirms the final arc of Demon Slayer will be released as a high-budget theatrical movie trilogy starting next year.',
    content: 'Ufotable has officially confirmed that the final arc of Demon Slayer (Kimetsu no Yaiba) will be released as a high-budget theatrical movie trilogy starting next year. The Hashira Training Arc serves as the setup for the final confrontation in the Infinity Castle, which will now be translated onto the big screen. Animation producers promise ground-breaking action cuts, cinematic visual layouts, and detailed character art matching the standards set by the Mugen Train movie.',
    source: 'Anime News Network',
  },
  {
    id: 'solo-leveling-season-2-release',
    title: 'Solo Leveling Season 2: Arise from the Shadow Release Date Set',
    link: '#',
    pubDate: 'July 11, 2026',
    description: 'A-1 Pictures reveals a new key visual and promotional video confirming the winter broadcasting schedule.',
    content: 'A-1 Pictures has revealed a new key visual and promotional video confirming the winter broadcasting schedule for Solo Leveling Season 2: Arise from the Shadow. Following the massive success of the debut season, Sung Jinwoo returns with his shadow army. The studio has announced that the secondary season will cover the Red Gate and Demon Castle arcs, introducing new hunter ranks and higher production CGI effects for Jinwoos abilities.',
    source: 'Crunchyroll News',
  },
  {
    id: 'chainsaw-man-movie-reze',
    title: 'Chainsaw Man Movie: Reze Arc Enters Post-Production Phase',
    link: '#',
    pubDate: 'July 10, 2026',
    description: 'MAPPA studio producers share updates regarding the musical score and dynamic animation cuts for the movie.',
    content: 'MAPPA studio producers have shared updates regarding the musical score and dynamic animation cuts for the upcoming Chainsaw Man Movie: Reze Arc, confirming that it has officially entered the post-production phase. Fans can expect a cinematic theatrical experience focusing on Denji and Reze. The soundtrack will see the return of premium rock arrangements, alongside detailed composite animation for the action choreography.',
    source: 'Wit & Mappa PR',
  },
  {
    id: 'my-hero-academia-concludes',
    title: 'My Hero Academia Manga Officially Concludes After 12 Years',
    link: '#',
    pubDate: 'July 09, 2026',
    description: 'Kohei Horikoshi publishes the final chapter in Weekly Shonen Jump, thanking fans worldwide for the journey.',
    content: 'Kohei Horikoshi has published the final chapter of My Hero Academia in Weekly Shonen Jump, officially concluding the legendary superhero manga after 12 years of serialization. Shueisha has released a special commemorative video tracking Izuku Midoriya and Class 1-A. Horikoshi thanked fans worldwide for their continuous support and hints at releasing special epilogue chapters later this autumn.',
    source: 'Shonen Jump',
  },
]

// Base64-like simple string hashing to generate safe IDs from titles
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function fetchLatestNews(): Promise<NewsArticle[]> {
  try {
    const res = await fetch('https://www.animenewsnetwork.com/all/rss.xml', {
      next: { revalidate: 3600 },
    })

    if (!res.ok) throw new Error('Failed to fetch news feed')

    const xml = await res.text()

    const items: NewsArticle[] = []
    const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g)

    for (const match of itemMatches) {
      const content = match[1]
      const titleMatch = content.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) || content.match(/<title>([\s\S]*?)<\/title>/)
      const linkMatch = content.match(/<link>([\s\S]*?)<\/link>/)
      const dateMatch = content.match(/<pubDate>([\s\S]*?)<\/pubDate>/)
      const descMatch = content.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) || content.match(/<description>([\s\S]*?)<\/description>/)

      if (titleMatch && linkMatch) {
        const titleText = titleMatch[1].trim()
        const rawDesc = descMatch ? descMatch[1] : ''
        
        // ANN RSS feeds sometimes include full summary HTML in the description
        const cleanDesc = rawDesc
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .slice(0, 160) + '...'

        const rawDate = dateMatch ? dateMatch[1] : ''
        const cleanDate = new Date(rawDate).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })

        items.push({
          id: slugify(titleText),
          title: titleText,
          link: linkMatch[1].trim(),
          pubDate: cleanDate !== 'Invalid Date' ? cleanDate : rawDate,
          description: cleanDesc.trim(),
          content: rawDesc.replace(/&nbsp;/g, ' ').trim(), // Keep full description HTML for reading
          source: 'Anime News Network',
        })
      }
    }

    return items.length > 0 ? items : FALLBACK_NEWS
  } catch {
    return FALLBACK_NEWS
  }
}

export async function getNewsArticleById(id: string): Promise<NewsArticle | null> {
  const news = await fetchLatestNews()
  return news.find((art) => art.id === id) || null
}
