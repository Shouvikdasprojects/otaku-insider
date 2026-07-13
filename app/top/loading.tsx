export default function TopLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="h-9 w-64 animate-pulse rounded-xl bg-secondary" aria-hidden="true" />
      <div className="mt-8 flex flex-col gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-[6.5rem] animate-pulse rounded-xl bg-secondary" aria-hidden="true" />
        ))}
      </div>
    </div>
  )
}
