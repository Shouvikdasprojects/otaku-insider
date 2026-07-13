'use client'

import { useState, useTransition } from 'react'
import { Star, Trash2, Edit3, Send } from 'lucide-react'
import { upsertReview, deleteReview } from '@/app/actions/reviews'
import type { Review } from '@/lib/db/schema'

export function ReviewsSection({
  animeId,
  animeTitle,
  animeCover,
  initialReviews,
  currentUserId,
  userReview,
}: {
  animeId: number
  animeTitle: string
  animeCover: string | null
  initialReviews: Review[]
  currentUserId: string | null
  userReview: Review | null
}) {
  const [isPending, startTransition] = useTransition()
  const [content, setContent] = useState(userReview?.content ?? '')
  const [rating, setRating] = useState(userReview?.rating ?? 0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isEditing, setIsEditing] = useState(!userReview)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    if (rating < 1) {
      setError('Please select a rating of at least 1 star.')
      return
    }
    if (content.trim().length < 20) {
      setError('Review must be at least 20 characters long.')
      return
    }
    startTransition(async () => {
      try {
        await upsertReview({
          animeId,
          animeTitle,
          animeCover,
          rating,
          content: content.trim(),
        })
        setSuccess(true)
        setIsEditing(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save review')
      }
    })
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete your review?')) return
    setError(null)
    startTransition(async () => {
      try {
        await deleteReview(animeId)
        setContent('')
        setRating(10)
        setIsEditing(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete review')
      }
    })
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Review Submission Form / User Review */}
      {currentUserId ? (
        <div className="rounded-2xl border border-border bg-card p-6">
          {!isEditing && userReview ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Your Review</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Edit3 className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="flex items-center gap-1 text-xs text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < userReview.rating ? 'fill-current' : 'opacity-25'}`}
                  />
                ))}
                <span className="ml-2 text-sm font-semibold text-foreground">{userReview.rating}/10</span>
              </div>
              <p className="whitespace-pre-line text-sm text-muted-foreground">{userReview.content}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h3 className="text-lg font-bold">{userReview ? 'Edit Your Review' : 'Write a Review'}</h3>

              {/* Rating Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Your Rating</label>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const val = i + 1
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(val)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star className={`h-6 w-6 ${val <= rating ? 'fill-current' : 'opacity-25'}`} />
                      </button>
                    )
                  })}
                  <span className="ml-2 text-sm font-bold text-foreground">{rating}/10</span>
                </div>
              </div>

              {/* Textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground" htmlFor="review-content">
                  Review Text (min 20 characters)
                </label>
                <textarea
                  id="review-content"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your thoughts about this anime..."
                  className="w-full rounded-xl border border-border bg-secondary/35 p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              {/* Feedback messages */}
              {error && <p className="text-xs font-semibold text-destructive">{error}</p>}
              {success && <p className="text-xs font-semibold text-emerald-400">Review saved successfully!</p>}

              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {content.length} characters (minimum 20)
                </p>
                <div className="flex gap-2">
                  {userReview && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-accent"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isPending || content.trim().length < 20}
                    className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
                  >
                    {isPending ? 'Saving...' : 'Submit Review'} <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Please <a href="/sign-in" className="font-semibold text-primary hover:underline">Sign In</a> to write a review.
          </p>
        </div>
      )}

      {/* Reviews List */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">Community Thoughts</h3>
        {initialReviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review!</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {initialReviews.map((rev) => (
              <li
                key={rev.id}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground glow-primary">
                      {rev.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-tight">{rev.userName}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="font-bold text-foreground">{rev.rating}/10</span>
                  </div>
                </div>
                <p className="whitespace-pre-line text-sm text-muted-foreground">{rev.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
