export async function getUserFavorites() {
  const user = await getSessionUser()
  if (!user) return []
  return db
    .select()
    .from(watchlist)
    .where(
      and(
        eq(watchlist.userId, user.id),
        or(
          gte(watchlist.userRating, 7),
          eq(watchlist.status, 'COMPLETED'),
          eq(watchlist.status, 'WATCHING')
        )
      )
    )
    .limit(5)
}
