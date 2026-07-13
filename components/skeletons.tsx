function Shimmer({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-secondary ${className}`} aria-hidden="true" />
}

export function CardSkeleton({ className = 'w-40 sm:w-44 shrink-0' }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Shimmer className="aspect-[2/3] w-full" />
      <Shimmer className="h-4 w-3/4" />
    </div>
  )
}

export function RowSkeleton({ title = true }: { title?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      {title && <Shimmer className="h-7 w-48" />}
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 7 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function GridSkeleton({ count = 18 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} className="w-full" />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="relative flex min-h-[70vh] items-end">
      <Shimmer className="absolute inset-0 rounded-none" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6">
        <div className="flex max-w-2xl flex-col gap-4">
          <Shimmer className="h-5 w-32" />
          <Shimmer className="h-12 w-full" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-2/3" />
          <div className="flex gap-3">
            <Shimmer className="h-11 w-36 rounded-full" />
            <Shimmer className="h-11 w-36 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-8 md:flex-row">
        <Shimmer className="aspect-[2/3] w-56 shrink-0" />
        <div className="flex flex-1 flex-col gap-4">
          <Shimmer className="h-10 w-2/3" />
          <Shimmer className="h-5 w-40" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-3/4" />
          <div className="flex gap-2">
            <Shimmer className="h-7 w-20 rounded-full" />
            <Shimmer className="h-7 w-20 rounded-full" />
            <Shimmer className="h-7 w-20 rounded-full" />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <RowSkeleton />
      </div>
    </div>
  )
}
