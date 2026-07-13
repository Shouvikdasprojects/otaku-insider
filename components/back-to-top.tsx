'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 400) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30 text-primary-foreground transition-all hover:scale-110 hover:shadow-primary/50 animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  )
}
