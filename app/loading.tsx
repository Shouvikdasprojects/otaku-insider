import { HeroSkeleton, RowSkeleton } from '@/components/skeletons'

export default function HomeLoading() {
  return (
    <div className="flex flex-col gap-12 pb-16">
      <HeroSkeleton />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6">
        <RowSkeleton />
        <RowSkeleton />
        <RowSkeleton />
      </div>
    </div>
  )
}
