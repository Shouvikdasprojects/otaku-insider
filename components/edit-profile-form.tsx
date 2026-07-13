'use client'

import { useRef, useState, useTransition } from 'react'
import { Save, Edit3 } from 'lucide-react'
import { updateProfile } from '@/app/actions/profile'

export function EditProfileForm({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName)
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null)
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    startTransition(async () => {
      const result = await updateProfile(name)
      if (result.error) {
        setMessage({ text: result.error, ok: false })
      } else {
        setMessage({ text: 'Profile updated!', ok: true })
        setTimeout(() => setMessage(null), 3000)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="profile-name" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Display Name
        </label>
        <div className="relative">
          <Edit3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            id="profile-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            required
            className="h-11 w-full rounded-xl border border-border bg-secondary/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending || name.trim() === initialName}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isPending ? 'Saving…' : 'Save Changes'}
        </button>

        {message && (
          <p className={`text-sm font-medium ${message.ok ? 'text-emerald-400' : 'text-red-400'}`}>
            {message.text}
          </p>
        )}
      </div>
    </form>
  )
}
