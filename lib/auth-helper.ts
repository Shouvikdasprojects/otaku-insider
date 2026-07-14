import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export async function getSessionUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })
    return session?.user ?? null
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') {
      throw error
    }
    console.error('Error in getSessionUser helper:', error)
    return null
  }
}
