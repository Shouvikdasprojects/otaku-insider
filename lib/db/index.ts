import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL connection string is missing')
}

// 2. Export db client using neon() HTTP connection client for fast edge queries
const sql = neon(process.env.DATABASE_URL)
export const db = drizzle(sql, { schema })
