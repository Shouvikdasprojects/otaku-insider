'use server'

import { getSessionUser } from '@/lib/auth-helper'
import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getProfile() {
  return getSessionUser()
}

export async function updateProfile(name: string): Promise<{ error?: string }> {
  const trimmed = name.trim()
  if (!trimmed || trimmed.length < 2) return { error: 'Name must be at least 2 characters.' }
  if (trimmed.length > 60) return { error: 'Name must be under 60 characters.' }

  const u = await getSessionUser()
  if (!u) return { error: 'Not signed in.' }

  await db
    .update(user)
    .set({ name: trimmed, updatedAt: new Date() })
    .where(eq(user.id, u.id))

  revalidatePath('/profile')
  return {}
}
