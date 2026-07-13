import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function PaginationNav({
  basePath,
  params,
  currentPage,
  lastPage,
}: {
  basePath: string
  params: Record<string, string>
  currentPage: number
  lastPage: number
}) {
  function pageHref(page: number) {
    const sp = new URLSearchParams({ ...params, page: String(page) })
    return `${basePath}?${sp.toString()}`
  }

  const cappedLast = Math.min(lastPage, 500)

  return (
    <nav className="flex items-center justify-center gap-3" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          className="flex items-center gap-1 rounded-full border border-border bg-secondary px-4 py-2 text-sm transition-colors hover:bg-accent"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground opacity-50">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Prev
        </span>
      )}
      <span className="font-mono text-sm text-muted-foreground">
        Page {currentPage} of {cappedLast}
      </span>
      {currentPage < cappedLast ? (
        <Link
          href={pageHref(currentPage + 1)}
          className="flex items-center gap-1 rounded-full border border-border bg-secondary px-4 py-2 text-sm transition-colors hover:bg-accent"
        >
          Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground opacity-50">
          Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  )
}
