import { computeStats } from '~/utils/gallery';

export default defineEventHandler(async () => {
  const storage = useStorage("storage");
  const photos = (await storage.getItem("/gallery/gallery-db.json")) as {
    id: number
    userId: number
    userName: string
    picture: string
  }[];

  const userIds = [...new Set(photos.map((p) => p.userId))];

  const [allAlbums, allPosts, allComments] = await Promise.all([
    $fetch<{ userId: number }[]>(
      "https://jsonplaceholder.typicode.com/albums",
    ),
    $fetch<{ id: number; userId: number }[]>(
      "https://jsonplaceholder.typicode.com/posts",
    ),
    $fetch<{ postId: number }[]>(
      "https://jsonplaceholder.typicode.com/comments",
    ),
  ]);

  const stats = computeStats(userIds, allAlbums, allPosts, allComments);

  return { photos, stats };
});
