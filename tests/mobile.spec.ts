import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['iPhone 14'] });

test('mobile navigation and charts visibility', async ({ page }) => {
  await page.goto('/');

  // 1. Verify sticky footer is visible
  const stickyFooter = page.getByTestId('mobile-sticky-footer');
  await expect(stickyFooter).toBeVisible();

  // 2. Open the Hamburger Menu (The 3-lines button)
  // We target the button inside the nav or the one in the sticky footer
  const menuBtn = page.getByRole('button', { name: /Menu/i }).first();
  await menuBtn.click();

  // 3. Click "View Analysis" from the professional vertical list
  const analysisLink = page.getByRole('button', { name: /View Analysis/i });
  await expect(analysisLink).toBeVisible();
  await analysisLink.click();

  // 4. Verify Chart is now visible (Equity Growth section)
  const chartTitle = page.getByRole('heading', { name: /Equity Growth/i });
  await expect(chartTitle).toBeVisible({ timeout: 10000 });

  // 5. Verify Sidebar Inputs are hidden on mobile while viewing analysis
  const sidebar = page.locator('aside');
  await expect(sidebar).toBeHidden();
});