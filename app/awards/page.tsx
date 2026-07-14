import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { AWARD_YEARS } from '@/lib/anilist-awards'
import { AwardsClient } from './awards-client'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>
}): Promise<Metadata> {
  const { year: y } = await searchParams
  const year = Number(y) || AWARD_YEARS[0]
  return {
    title: `${year} Anime Awards — Otaku Insider`,
    description: `The best anime of ${year} across every genre — Anime of the Year, Best Action, Romance, Fantasy, and more.`,
  }
}

export default async function AwardsPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>
}) {
  const { year: y } = await searchParams
  const year = Math.min(
    Math.max(Number(y) || AWARD_YEARS[0], AWARD_YEARS[AWARD_YEARS.length - 1]),
    AWARD_YEARS[0],
  )

  if (isNaN(year)) notFound()

  return <AwardsClient year={year} />
}
