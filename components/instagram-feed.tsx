'use client'

import { useState, useEffect } from 'react'
import { fetchInstagramFeed } from '@/app/actions/instagram'
import { InstagramFeedClient } from './instagram-feed-client'

export function InstagramFeed() {
  const [data, setData] = useState<{items: any[], followers: number, postsCount: number} | null>(null)

  useEffect(() => {
    let mounted = true
    fetchInstagramFeed().then(res => {
      if (mounted) setData(res)
    }).catch(console.error)
    return () => { mounted = false }
  }, [])

  if (!data) return null

  return (
    <InstagramFeedClient
      initialItems={data.items}
      followers={data.followers}
      postsCount={data.postsCount}
    />
  )
}
