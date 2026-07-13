'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function KeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Focus Search: '/' key (if not already focusing an input/textarea)
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault()
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="Search"]') as HTMLInputElement | null
        if (searchInput) {
          searchInput.focus()
          searchInput.select()
        }
      }

      // Quick Navs: Alt + Key
      if (e.altKey && !e.ctrlKey && !e.shiftKey) {
        switch (e.key.toLowerCase()) {
          case 'w':
            e.preventDefault()
            router.push('/watchlist')
            break
          case 's':
            e.preventDefault()
            router.push('/stats')
            break
          case 'h':
            e.preventDefault()
            router.push('/')
            break
          case 'b':
            e.preventDefault()
            router.push('/browse')
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router])

  return null
}
