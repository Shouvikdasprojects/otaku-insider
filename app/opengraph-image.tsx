import { ImageResponse } from 'next/og'

export const alt = 'Otaku Insider — Your ultimate anime companion'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
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
        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(220,190,80,0.18) 0%, transparent 70%)',
        }} />
        {/* Decorative rings */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '500px', borderRadius: '50%', border: '1px solid rgba(220,190,80,0.08)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', borderRadius: '50%', border: '1px solid rgba(220,190,80,0.04)', display: 'flex' }} />

        {/* Logo circle */}
        <div style={{
          width: '96px', height: '96px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #d4a830 0%, #f0c84a 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '40px', fontWeight: 900, color: '#0d0d10',
          marginBottom: '28px',
          boxShadow: '0 0 48px rgba(220,190,80,0.4)',
        }}>O</div>

        {/* Title */}
        <div style={{
          fontSize: '72px', fontWeight: 900, letterSpacing: '-2px',
          background: 'linear-gradient(90deg, #d4a830, #f5e090, #d4a830)',
          backgroundClip: 'text', color: 'transparent',
          display: 'flex', marginBottom: '16px',
        }}>
          Otaku Insider
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: '24px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex' }}>
          Your ultimate anime companion
        </div>

        {/* Bottom badge */}
        <div style={{
          position: 'absolute', bottom: '36px',
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255,255,255,0.05)', borderRadius: '9999px',
          padding: '8px 20px', border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'flex' }} />
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', display: 'flex' }}>Powered by AniList</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
