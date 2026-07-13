'use client'

import { useEffect } from 'react'
import { useRecentlyViewed } from '@/hooks/use-recently-viewed'

interface Props {
  id: number
  title: string
  coverImage: string | null
  format: string | null
  averageScore: number | null
}

/** Drop this anywhere in the anime detail page — it records the visit silently. */
export function TrackVisit({ id, title, coverImage, format, averageScore }: Props) {
  const { add } = useRecentlyViewed()

  useEffect(() => {
    add({ id, title, coverImage, format, averageScore })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return null
}
