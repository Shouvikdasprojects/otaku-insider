import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

if (!process.env.DATABASE_URL) {
  console.warn('⚠️ DATABASE_URL connection string is missing. If this is a build step, it can be ignored. Otherwise, database connections will fail.')
}

// 2. Export db client using neon() HTTP connection client for fast edge queries
const sql = neon(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/dummy')
export const db = drizzle(sql, { schema })
