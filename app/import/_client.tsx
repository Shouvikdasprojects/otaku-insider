'use client'

import { useState } from 'react'
import { Download, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react'
import { importFromAniListClient, importFromMALClient } from '@/app/import/import-logic'

type Platform = 'anilist' | 'mal'
type Step = 'input' | 'importing' | 'done' | 'error'

interface Result { imported: number; skipped: number }

export default function ImportClient() {
  const [platform, setPlatform] = useState<Platform>('anilist')
  const [username, setUsername]  = useState('')
  const [step, setStep]          = useState<Step>('input')
  const [result, setResult]      = useState<Result | null>(null)
  const [error, setError]        = useState<string | null>(null)

  async function handleImport(e: React.FormEvent) {
    e.preventDefault()
    if (!username.trim()) return
    setStep('importing')
    setError(null)
    try {
      const res = platform === 'anilist'
        ? await importFromAniListClient(username)
        : await importFromMALClient(username)
      setResult(res)
      setStep('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setStep('error')
    }
  }

  function reset() { setStep('input'); setUsername(''); setResult(null); setError(null) }

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-14 sm:px-6">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Download className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-3xl font-black tracking-tight">Import Watchlist</h1>
        <p className="text-sm text-muted-foreground">
          Bring your existing anime list from AniList or MyAnimeList into Otaku Insider.
          Existing entries are never overwritten.
        </p>
      </div>

      <div className="mb-6 flex rounded-xl border border-border bg-secondary/30 p-1">
        {(['anilist', 'mal'] as Platform[]).map((p) => (
          <button key={p} type="button" onClick={() => { setPlatform(p); reset() }}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${platform === p ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}>
            {p === 'anilist' ? 'AniList' : 'MyAnimeList'}
          </button>
        ))}
      </div>

      {step === 'input' && (
        <form onSubmit={handleImport} className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <label className="mb-2 block text-sm font-semibold" htmlFor="import-username">
              {platform === 'anilist' ? 'AniList' : 'MAL'} Username
            </label>
            <input id="import-username" type="text" value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={platform === 'anilist' ? 'e.g. YourAniListUser' : 'e.g. YourMALUsername'}
              required
              className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              {platform === 'anilist'
                ? 'Your list must be public in AniList settings.'
                : 'Your MAL profile must be public. MAL IDs are cross-referenced to AniList — may take ~30s for large lists.'}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/50 px-5 py-4 text-sm text-muted-foreground">
            <p className="mb-1 font-semibold text-foreground">What gets imported:</p>
            <ul className="list-inside list-disc space-y-0.5">
              <li>All statuses: Watching, Completed, Planning, Paused, Dropped</li>
              <li>Episode watch progress</li>
              <li>Existing entries are skipped — never overwritten</li>
            </ul>
          </div>

          <button type="submit" disabled={!username.trim()}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40">
            Start Import <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      )}

      {step === 'importing' && (
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card px-8 py-14 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <div>
            <p className="font-bold">Importing from {platform === 'anilist' ? 'AniList' : 'MAL'}…</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {platform === 'mal' ? 'Cross-referencing MAL IDs to AniList. This can take up to a minute for large lists.' : 'Fetching your anime list…'}
            </p>
          </div>
        </div>
      )}

      {step === 'done' && result && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-8 py-10 text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-400" />
            <div>
              <p className="text-xl font-black">Import complete!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                From <span className="font-semibold text-foreground">{username}</span>
              </p>
            </div>
            <div className="flex w-full justify-center gap-10">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary">{result.imported}</span>
                <span className="text-xs text-muted-foreground">Imported</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-muted-foreground">{result.skipped}</span>
                <span className="text-xs text-muted-foreground">Skipped</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <a href="/watchlist" className="flex-1 rounded-xl bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground hover:opacity-90">
              View Watchlist
            </a>
            <button onClick={reset} className="flex-1 rounded-xl border border-border py-2.5 text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-foreground">
              Import Another
            </button>
          </div>
        </div>
      )}

      {step === 'error' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-destructive/30 bg-destructive/5 px-8 py-10 text-center">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div>
              <p className="text-lg font-bold">Import failed</p>
              <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
          <button onClick={reset} className="rounded-xl border border-border py-2.5 text-sm font-semibold text-muted-foreground hover:bg-accent">
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
