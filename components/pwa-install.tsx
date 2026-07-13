'use client'

import { useEffect, useState } from 'react'
import { PlusCircle, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export function PwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Check if user already dismissed it this session
      const dismissed = sessionStorage.getItem('pwa_dismissed')
      if (!dismissed) {
        setVisible(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  async function handleInstall() {
    if (!deferredPrompt) return
    setVisible(false)
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }

  function handleDismiss() {
    setVisible(false)
    sessionStorage.setItem('pwa_dismissed', 'true')
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-primary/20 bg-card p-4 shadow-2xl shadow-primary/10 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <PlusCircle className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold leading-tight">Install Otaku Insider</p>
        <p className="text-xs text-muted-foreground mt-0.5">Add to your home screen for quick tracking.</p>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          onClick={handleInstall}
          className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss install prompt"
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
