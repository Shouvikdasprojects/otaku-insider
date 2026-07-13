import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { session, user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function getSessionUser() {
  try {
    const cookieStore = await cookies()
    // Better Auth session token cookie name can be secure or plain
    const token =
      cookieStore.get('better-auth.session_token')?.value ||
      cookieStore.get('__Secure-better-auth.session_token')?.value

    if (!token) return null

    // Look up the session in the database
    const sessionRows = await db
      .select()
      .from(session)
      .where(eq(session.token, token))
      .limit(1)

    const sessionData = sessionRows[0]
    if (!sessionData) return null

    // Check if session has expired
    if (new Date(sessionData.expiresAt) < new Date()) {
      return null
    }

    // Retrieve user details
    const userRows = await db
      .select()
      .from(user)
      .where(eq(user.id, sessionData.userId))
      .limit(1)

    return userRows[0] ?? null
  } catch (error) {
    console.error('Error in getSessionUser helper:', error)
    return null
  }
}
