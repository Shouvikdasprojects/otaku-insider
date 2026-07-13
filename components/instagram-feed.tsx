import { fetchInstagramFeed } from '@/app/actions/instagram'
import { InstagramFeedClient } from './instagram-feed-client'

export async function InstagramFeed() {
  const { items, followers, postsCount } = await fetchInstagramFeed()

  return (
    <InstagramFeedClient
      initialItems={items}
      followers={followers}
      postsCount={postsCount}
    />
  )
}
