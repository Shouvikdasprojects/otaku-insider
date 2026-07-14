'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from '@/components/icons'
import { authClient } from '@/lib/auth-client'

export function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20 hover:border-red-500/40"
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      Sign out of this device
    </button>
  )
}
