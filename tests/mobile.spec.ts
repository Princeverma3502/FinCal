import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['iPhone 14'] });

test('mobile navigation and charts visibility', async ({ page }) => {
  await page.goto('/');

  // 1. Verify sticky footer EMI is visible
  const stickyEmi = page.locator('div.fixed.bottom-4 >> text=Monthly EMI');
  await expect(stickyEmi).toBeVisible();

  // 2. Click "Analysis" Tab
  await page.getByRole('button', { name: /Analysis/i }).click();

  // 3. Verify Chart is now visible
  const chartTitle = page.locator('h2:has-text("Equity Growth")');
  await expect(chartTitle).toBeVisible();

  // 4. Verify Sidebar Inputs are now hidden on mobile
  const sidebar = page.locator('aside');
  await expect(sidebar).toBeHidden();
});