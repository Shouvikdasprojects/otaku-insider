'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 transition-transform hover:rotate-12" />
      ) : (
        <Moon className="h-4 w-4 transition-transform hover:-rotate-12" />
      )}
    </button>
  )
}
