import { test, expect } from '@playwright/test';

test('verify tab icon and page branding', async ({ page }) => {
  await page.goto('/');

  // 1. Verify Title
  await expect(page).toHaveTitle(/FinCal | Mortgage Pro/i);

  // 2. Verify Favicon Link in Head
  const favicon = await page.locator('link[rel="icon"]').getAttribute('href');
  expect(favicon).toContain('icon.png');

  // 3. Verify Logo in Navbar
  const navLogo = page.locator('nav img');
  await expect(navLogo).toBeVisible();
  await expect(navLogo).toHaveAttribute('src', '/icon.png');
});