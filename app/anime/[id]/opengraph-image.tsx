

import { ImageResponse } from 'next/og'

export const alt = 'Anime details on Otaku Insider'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Params = Promise<{ id: string }>

export default async function OGImage({ params }: { params: Params }) {
  const { id } = await params

  // Fetch anime data
  let title = 'Anime Details'
  let score = 0
  let genres: string[] = []
  let format = ''
  let coverUrl: string | null = null

  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query($id:Int){Media(id:$id,type:ANIME){title{romaji english}coverImage{large}averageScore genres episodes format}}`,
        variables: { id: Number(id) },
      }),
      next: { revalidate: 3600 },
    })
    const json = await res.json()
    const media = json?.data?.Media
    if (media) {
      title = media.title?.english || media.title?.romaji || title
      score = media.averageScore ?? 0
      genres = (media.genres ?? []).slice(0, 3)
      format = media.format ?? ''
      coverUrl = media.coverImage?.large ?? null
    }
  } catch { /* fallback to defaults */ }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          background: '#0d0d10',
          display: 'flex', position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Golden left accent bar */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px',
          background: 'linear-gradient(180deg, #f0c84a, #d4a830)',
        }} />

        {/* Bg glow */}
        <div style={{
          position: 'absolute', top: '-100px', right: '200px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(220,190,80,0.10) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Cover image */}
        {coverUrl && (
          <div style={{ position: 'absolute', left: '32px', top: '0', bottom: '0', display: 'flex', alignItems: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverUrl}
              alt=""
              style={{ width: '280px', height: '400px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}
            />
          </div>
        )}

        {/* Text content */}
        <div style={{
          position: 'absolute',
          left: coverUrl ? '360px' : '60px',
          right: '40px',
          top: '0', bottom: '0',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px',
        }}>
          {/* Format badge */}
          {format && (
            <div style={{
              display: 'flex', alignItems: 'center',
              background: 'rgba(220,190,80,0.12)', borderRadius: '6px',
              padding: '4px 12px', width: 'fit-content',
              border: '1px solid rgba(220,190,80,0.2)',
            }}>
              <span style={{ color: '#d4a830', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex' }}>
                {format.replace(/_/g, ' ')}
              </span>
            </div>
          )}

          {/* Title */}
          <div style={{
            fontSize: title.length > 40 ? '36px' : '48px',
            fontWeight: 900, color: '#ffffff',
            lineHeight: 1.15, letterSpacing: '-0.5px',
            display: 'flex', flexWrap: 'wrap',
          }}>
            {title}
          </div>

          {/* Score */}
          {score > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '28px', display: 'flex' }}>⭐</span>
              <span style={{ fontSize: '36px', fontWeight: 900, color: score >= 85 ? '#4ade80' : '#d4a830', display: 'flex' }}>
                {(score / 10).toFixed(1)}
              </span>
              <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.4)', display: 'flex' }}>/10</span>
            </div>
          )}

          {/* Genres */}
          {genres.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {genres.map((g) => (
                <div key={g} style={{
                  background: 'rgba(255,255,255,0.06)', borderRadius: '9999px',
                  padding: '4px 14px', border: '1px solid rgba(255,255,255,0.10)',
                  display: 'flex',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', display: 'flex' }}>{g}</span>
                </div>
              ))}
            </div>
          )}

          {/* Branding */}
          <div style={{
            marginTop: '24px', display: 'flex', alignItems: 'center', gap: '10px',
            paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #d4a830, #f0c84a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: 900, color: '#0d0d10',
            }}>O</div>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', fontWeight: 600, display: 'flex' }}>
              Otaku Insider
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
