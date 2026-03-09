import { fileURLToPath } from 'node:url';
import { describe, test, expect } from 'vitest';
import { setup, createPage, url } from '@nuxt/test-utils/e2e';

describe('gallery page', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../../', import.meta.url)),
    browser: true,
    nuxtConfig: {
      ssr: false,
      routeRules: {},
    },
  });

  test('shows user sections with stats', async () => {
    const page = await createPage();

    await page.route('**/api/gallery', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          photos: [
            { id: 1, userId: 1, userName: 'Leanne Graham', picture: 'https://fastly.picsum.photos/id/1/1200/800' },
            { id: 2, userId: 2, userName: 'Ervin Howell', picture: 'https://fastly.picsum.photos/id/2/1200/800' },
          ],
          stats: [
            { userId: 1, albumCount: 10, postCount: 10, commentCount: 50 },
            { userId: 2, albumCount: 8, postCount: 8, commentCount: 40 },
          ],
        }),
      }),
    );

    await page.goto(url('/'));
    await page.click('a[href="/gallery"]');
    await page.waitForSelector('.user-section h2', { timeout: 15_000 });

    expect(await page.locator('.user-section h2').first().textContent()).toBe('Leanne Graham');
    expect(await page.locator('.user-section h2').nth(1).isVisible()).toBe(true);
    expect(await page.getByText('Albums: 10').isVisible()).toBe(true);
    expect(await page.getByText('Posts: 10').isVisible()).toBe(true);
    expect(await page.getByText('Comments: 50').isVisible()).toBe(true);
    expect(await page.locator('img[alt^="Photo by"]').first().isVisible()).toBe(true);

    await page.close();
  });
});
