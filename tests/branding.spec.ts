import { test, expect } from '@playwright/test';

test.describe('Branding and SEO', () => {
  test('verify tab icon and page branding', async ({ page }) => {
    await page.goto('/');

    // 1. Verify Page Title
    await expect(page).toHaveTitle(/FinCal | Mortgage Pro/i);

    // 2. Verify Favicon (Fixed strict mode violation by adding .first())
    const favicon = await page.locator('link[rel="icon"]').first().getAttribute('href');
    expect(favicon).toContain('icon.png');

    // 3. Verify Logo in Navbar
    const logo = page.locator('nav img').first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', '/icon.png');
  });
});