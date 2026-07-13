export default function ProfileLoading() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="h-24 w-24 animate-pulse rounded-full bg-secondary" />
        <div className="h-6 w-40 animate-pulse rounded-lg bg-secondary" />
        <div className="h-4 w-56 animate-pulse rounded-lg bg-secondary/60" />
      </div>
      <div className="flex flex-col gap-4">
        {[120, 160, 100].map((h, i) => (
          <div key={i} className="h-[${h}px] animate-pulse rounded-2xl bg-secondary" style={{ height: h, animationDelay: `${i * 80}ms` }} />
        ))}
      </div>
    </div>
  )
}
