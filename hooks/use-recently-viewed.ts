import { useState, useEffect, useCallback } from 'react'

export interface RecentItem {
  id: number
  title: string
  coverImage: string | null
  format: string | null
  averageScore: number | null
  viewedAt: number
}

const KEY = 'otaku_recently_viewed'
const MAX = 10

function load(): RecentItem[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as RecentItem[]
  } catch {
    return []
  }
}

function save(items: RecentItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items))
}

export function useRecentlyViewed() {
  const [items, setItems] = useState<RecentItem[]>([])

  // Hydrate on mount
  useEffect(() => { setItems(load()) }, [])

  const add = useCallback((item: Omit<RecentItem, 'viewedAt'>) => {
    setItems((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id)
      const next = [{ ...item, viewedAt: Date.now() }, ...filtered].slice(0, MAX)
      save(next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    localStorage.removeItem(KEY)
    setItems([])
  }, [])

  return { items, add, clear }
}
