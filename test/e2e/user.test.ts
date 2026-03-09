import { fileURLToPath } from 'node:url'
import { describe, test, expect } from 'vitest'
import { setup, createPage, url } from '@nuxt/test-utils/e2e'

const mockUserData = {
  user: { id: 1, name: 'Leanne Graham' },
  todos: Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    userId: 1,
    title: `Todo ${i + 1}`,
    completed: i % 2 === 0,
  })),
}

const mockUsers = [
  { id: 1, name: 'Leanne Graham', email: 'sincere@april.biz', username: 'Bret' },
]

describe('user pages', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../../', import.meta.url)),
    browser: true,
    nuxtConfig: {
      ssr: false,
      routeRules: {},
    },
  })

  describe('user todo page', () => {
    test('shows the user name as heading', async () => {
      const page = await createPage()
      await page.route('**/api/user/*', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockUserData),
        }),
      )
      await page.goto(url('/user/1'))
      await page.waitForSelector('article ul', { timeout: 15_000 })

      expect(await page.locator('article h1').textContent()).not.toBe('')

      await page.close()
    })

    test('limit select restricts the number of visible todos', async () => {
      const page = await createPage()
      await page.route('**/api/user/*', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockUserData),
        }),
      )
      await page.goto(url('/user/1'))
      await page.waitForSelector('article ul', { timeout: 15_000 })

      await page.locator('#max-items').selectOption('5')

      const count = await page.locator('article ul li').count()
      expect(count).toBe(5)

      await page.close()
    })

    test("unchecking 'Show completed' hides completed todos", async () => {
      const page = await createPage()
      await page.route('**/api/user/*', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockUserData),
        }),
      )
      await page.goto(url('/user/1'))
      await page.waitForSelector('article ul', { timeout: 15_000 })

      const completedItems = page.locator('article ul li.completed')
      expect(await completedItems.count()).toBeGreaterThan(0)

      await page.locator('#show-completed').uncheck()

      for (const item of await completedItems.all()) {
        expect(await item.isHidden()).toBe(true)
      }

      await page.close()
    })

    test("unchecking 'Show pending' hides pending todos", async () => {
      const page = await createPage()
      await page.route('**/api/user/*', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockUserData),
        }),
      )
      await page.goto(url('/user/1'))
      await page.waitForSelector('article ul', { timeout: 15_000 })

      const pendingItems = page.locator('article ul li.pending')
      expect(await pendingItems.count()).toBeGreaterThan(0)

      await page.locator('#show-pending').uncheck()

      for (const item of await pendingItems.all()) {
        expect(await item.isHidden()).toBe(true)
      }

      await page.close()
    })

    test("sort 'Completed first' puts completed todos before pending", async () => {
      const page = await createPage()
      await page.route('**/api/user/*', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockUserData),
        }),
      )
      await page.goto(url('/user/1'))
      await page.waitForSelector('article ul', { timeout: 15_000 })

      await page.locator('#sort-order').selectOption('completed')

      const items = page.locator('article ul li')
      const classes = await items.evaluateAll((els) =>
        els.map((el) => el.className),
      )
      const lastCompletedIdx = classes.map((c) => c.includes('completed')).lastIndexOf(true)
      const firstPendingIdx = classes.findIndex((c) => c.includes('pending'))

      expect(lastCompletedIdx).toBeGreaterThan(-1)
      expect(firstPendingIdx).toBeGreaterThan(-1)
      expect(lastCompletedIdx).toBeLessThan(firstPendingIdx)

      await page.close()
    })

    test("'Check all' marks every todo as completed", async () => {
      const page = await createPage()
      await page.route('**/api/user/*', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockUserData),
        }),
      )
      await page.goto(url('/user/1'))
      await page.waitForSelector('article ul', { timeout: 15_000 })

      await page.locator('#check-all').check()

      for (const item of await page.locator('article ul li').all()) {
        expect(await item.getAttribute('class')).toContain('completed')
      }

      await page.close()
    })

    test('shows an error state when the API fails', async () => {
      const page = await createPage()
      await page.route('https://jsonplaceholder.typicode.com/users', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockUsers),
        }),
      )
      await page.goto(url('/'))
      await page.waitForSelector('ul li a', { timeout: 15_000 })
      await page.route('**/api/user/*', (route) =>
        route.fulfill({ status: 500, body: 'Internal Server Error' }),
      )
      await page.locator('ul li a').first().click()
      await page.waitForSelector('text=Failed to load todos', { timeout: 10_000 })
      expect(await page.getByText(/Failed to load todos/).isVisible()).toBe(true)

      await page.close()
    }, 15_000)
  })

  describe('user navigation', () => {
    test('clicking a user in the list navigates to their detail page', async () => {
      const page = await createPage()
      await page.route('https://jsonplaceholder.typicode.com/users', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockUsers),
        }),
      )
      await page.route('**/api/user/*', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockUserData),
        }),
      )
      await page.goto(url('/'))
      await page.waitForSelector('ul li a', { timeout: 15_000 })

      const firstLink = page.locator('ul li a').first()
      const href = await firstLink.getAttribute('href')
      await firstLink.click()
      await page.waitForURL(`**${href}`, { timeout: 10_000 })

      expect(page.url()).toContain(href!)
      await page.waitForSelector('article')
      expect(await page.locator('article').isVisible()).toBe(true)

      await page.close()
    })
  })
})
