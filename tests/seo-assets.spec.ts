import { test, expect } from '@playwright/test';

test('verify branding and meta assets', async ({ page }) => {
  await page.goto('/');

  // 1. Verify Page Title
  await expect(page).toHaveTitle(/FinCal | Mortgage Pro/);

  // 2. Verify Favicon/Icon existence in head
  const favicon = await page.locator('link[rel="icon"]').getAttribute('href');
  expect(favicon).toContain('icon.png');

  // 3. Verify Logo in Navbar
  const logo = page.locator('nav img');
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute('src', '/icon.png');
});