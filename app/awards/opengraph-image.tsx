import { ImageResponse } from 'next/og'

export const alt = 'Anime Awards — Otaku Insider'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  const year = new Date().getFullYear() - 1

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          background: '#0d0d10',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Large radial glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -60%)',
          width: '700px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(220,190,80,0.22) 0%, transparent 65%)',
          display: 'flex',
        }} />

        {/* Decorative corner shapes */}
        <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(220,190,80,0.07)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(220,190,80,0.05)', display: 'flex' }} />

        {/* Trophy */}
        <div style={{
          fontSize: '96px', marginBottom: '24px',
          filter: 'drop-shadow(0 0 40px rgba(220,190,80,0.5))',
          display: 'flex',
        }}>
          🏆
        </div>

        {/* Year */}
        <div style={{
          fontSize: '28px', fontWeight: 700, letterSpacing: '0.25em',
          color: 'rgba(220,190,80,0.7)', textTransform: 'uppercase',
          marginBottom: '12px', display: 'flex',
        }}>
          {year}
        </div>

        {/* Title */}
        <div style={{
          fontSize: '72px', fontWeight: 900, letterSpacing: '-1px',
          background: 'linear-gradient(90deg, #d4a830, #f5e090, #d4a830)',
          backgroundClip: 'text', color: 'transparent',
          marginBottom: '16px', display: 'flex',
        }}>
          Anime Awards
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: '20px', color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.08em', display: 'flex',
        }}>
          The best anime of the year, across every genre
        </div>

        {/* Bottom branding */}
        <div style={{
          position: 'absolute', bottom: '36px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #d4a830, #f0c84a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 900, color: '#0d0d10',
          }}>O</div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', fontWeight: 600, display: 'flex' }}>
            Otaku Insider
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
