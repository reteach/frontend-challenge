export function computeStats(
  userIds: number[],
  allAlbums: { userId: number }[],
  allPosts: { id: number; userId: number }[],
  allComments: { postId: number }[],
) {
  const commentCountByPost = new Map<number, number>();
  for (const c of allComments) {
    commentCountByPost.set(c.postId, (commentCountByPost.get(c.postId) ?? 0) + 1);
  }

  const albumsByUser = new Map<number, number>();
  for (const a of allAlbums) {
    albumsByUser.set(a.userId, (albumsByUser.get(a.userId) ?? 0) + 1);
  }

  const postsByUser = new Map<number, { id: number }[]>();
  for (const p of allPosts) {
    const list = postsByUser.get(p.userId) ?? [];
    list.push(p);
    postsByUser.set(p.userId, list);
  }

  return userIds.map((userId) => {
    const posts = postsByUser.get(userId) ?? [];
    const commentCount = posts.reduce(
      (sum, p) => sum + (commentCountByPost.get(p.id) ?? 0),
      0,
    );
    return {
      userId,
      albumCount: albumsByUser.get(userId) ?? 0,
      postCount: posts.length,
      commentCount,
    };
  });
}
