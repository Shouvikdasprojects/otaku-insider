import { GridSkeleton } from '@/components/skeletons'

export default function BrowseLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 h-9 w-56 animate-pulse rounded-xl bg-secondary" aria-hidden="true" />
      <GridSkeleton />
    </div>
  )
}
