import { describe, test, expect } from 'vitest';
import { computeStats } from '../../utils/gallery';

describe('computeStats', () => {
  test('counts albums per user correctly', () => {
    const albums = [{ userId: 1 }, { userId: 1 }, { userId: 2 }];
    const [s1, s2] = computeStats([1, 2], albums, [], []);
    expect(s1.albumCount).toBe(2);
    expect(s2.albumCount).toBe(1);
  });

  test('counts posts per user correctly', () => {
    const posts = [
      { id: 10, userId: 1 },
      { id: 11, userId: 1 },
      { id: 12, userId: 2 },
    ];
    const [s1, s2] = computeStats([1, 2], [], posts, []);
    expect(s1.postCount).toBe(2);
    expect(s2.postCount).toBe(1);
  });

  test('aggregates comment counts across all posts belonging to a user', () => {
    const posts = [
      { id: 10, userId: 1 },
      { id: 11, userId: 1 },
    ];
    const comments = [{ postId: 10 }, { postId: 10 }, { postId: 11 }];
    const [stat] = computeStats([1], [], posts, comments);
    expect(stat.commentCount).toBe(3);
  });

  test('does not count comments from posts belonging to another user', () => {
    const posts = [
      { id: 10, userId: 1 },
      { id: 20, userId: 2 },
    ];
    const comments = [{ postId: 20 }, { postId: 20 }];
    const [s1] = computeStats([1], [], posts, comments);
    expect(s1.commentCount).toBe(0);
  });

  test('produces independent stats for each user', () => {
    const albums = [{ userId: 1 }, { userId: 2 }, { userId: 2 }];
    const posts = [
      { id: 1, userId: 1 },
      { id: 2, userId: 2 },
    ];
    const comments = [{ postId: 1 }, { postId: 2 }, { postId: 2 }];
    const [s1, s2] = computeStats([1, 2], albums, posts, comments);
    expect(s1).toEqual({
      userId: 1,
      albumCount: 1,
      postCount: 1,
      commentCount: 1,
    });
    expect(s2).toEqual({
      userId: 2,
      albumCount: 2,
      postCount: 1,
      commentCount: 2,
    });
  });
});
