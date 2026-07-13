export default function ScheduleLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-3">
        <div className="h-8 w-56 animate-pulse rounded-lg bg-secondary" />
        <div className="h-4 w-80 animate-pulse rounded bg-secondary" />
      </div>
      <div className="mb-6 flex gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-9 w-24 shrink-0 animate-pulse rounded-full bg-secondary" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-[120px] animate-pulse rounded-xl bg-secondary" />
        ))}
      </div>
    </div>
  )
}
