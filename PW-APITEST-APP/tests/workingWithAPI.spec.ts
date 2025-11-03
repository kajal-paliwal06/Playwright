import { test, expect } from '@playwright/test';
import tags from '../test-data/tags.json'

test.beforeEach (async ({page}) => {
  await page.route('*/**/api/tags', async route => {
    await route.fulfill({
      body:JSON.stringify(tags)
    })
  })
   
    await page.goto('https://angular.realworld.io/'); 
})  
test('has title', async ({ page }) => {
await page.route('*/**/api/articles?limit=10&offset=0', async route => {
  const response = await route.fetch()
  const responseBody = await response.json()
  responseBody.articles[0].title =  "This is a test title"
  responseBody.articles[0].description =  "This is a description"
  
  await route.fulfill({
    body: JSON.stringify(responseBody)
  })
}) 
  await page.getByText('Global Feed').click()
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
  await expect(page.locator('app-article-list h1').first()).toContainText('This is a test title', { timeout: 30000 });
  await expect(page.locator('app-article-list p').first()).toContainText('This is a description', { timeout: 30000 });
});

