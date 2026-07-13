export default function WatchLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1">
          <div className="aspect-video w-full animate-pulse rounded-xl bg-secondary" aria-hidden="true" />
          <div className="mt-4 h-8 w-2/3 animate-pulse rounded-xl bg-secondary" aria-hidden="true" />
        </div>
        <div className="flex w-full flex-col gap-3 lg:w-80">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-secondary" aria-hidden="true" />
          ))}
        </div>
      </div>
    </div>
  )
}
