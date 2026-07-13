'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function getProfile() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user ?? null
}

export async function updateProfile(name: string): Promise<{ error?: string }> {
  const trimmed = name.trim()
  if (!trimmed || trimmed.length < 2) return { error: 'Name must be at least 2 characters.' }
  if (trimmed.length > 60) return { error: 'Name must be under 60 characters.' }

  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return { error: 'Not signed in.' }

  await db
    .update(user)
    .set({ name: trimmed, updatedAt: new Date() })
    .where(eq(user.id, session.user.id))

  revalidatePath('/profile')
  return {}
}
