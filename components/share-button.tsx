'use client'

import { useState } from 'react'
import { Share2, Check, Link as LinkIcon } from 'lucide-react'

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = window.location.href
    // Try native share first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title, text: `Check out ${title} on Otaku Insider`, url })
        return
      } catch { /* user cancelled or not supported */ }
    }
    // Fallback: clipboard
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleShare}
      aria-label="Share this anime"
      className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
    >
      {copied ? (
        <><Check className="h-4 w-4 text-emerald-400" /> Copied!</>
      ) : (
        <><Share2 className="h-4 w-4" /> Share</>
      )}
    </button>
  )
}
