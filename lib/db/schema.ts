import { pgTable, text, timestamp, boolean, serial, integer, unique } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------

export const watchlist = pgTable(
  'watchlist',
  {
    id: serial('id').primaryKey(),
    userId: text('userId').notNull(),
    animeId: integer('animeId').notNull(),
    title: text('title').notNull(),
    coverImage: text('coverImage'),
    format: text('format'),
    episodes: integer('episodes'),
    averageScore: integer('averageScore'),
    status: text('status').notNull().default('PLANNING'),
    progress: integer('progress').notNull().default(0),
    userRating: integer('userRating'),           // personal 1-10 score
    notes: text('notes'),                         // personal notes
    rewatchCount: integer('rewatchCount').notNull().default(0),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (t) => [unique().on(t.userId, t.animeId)],
)

export type WatchlistEntry = typeof watchlist.$inferSelect

export const review = pgTable(
  'review',
  {
    id:         serial('id').primaryKey(),
    userId:     text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
    userName:   text('userName').notNull(),
    animeId:    integer('animeId').notNull(),
    animeTitle: text('animeTitle').notNull(),
    animeCover: text('animeCover'),
    rating:     integer('rating').notNull(),    // 1-10
    content:    text('content').notNull(),
    createdAt:  timestamp('createdAt').notNull().defaultNow(),
    updatedAt:  timestamp('updatedAt').notNull().defaultNow(),
  },
  (t) => [unique().on(t.userId, t.animeId)],
)

export type Review = typeof review.$inferSelect
