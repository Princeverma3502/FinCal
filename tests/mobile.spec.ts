import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['iPhone 14'] });

test('mobile navigation and charts visibility', async ({ page }) => {
  await page.goto('/');

  // 1. Verify sticky footer is visible using the specific test ID
  const stickyFooter = page.getByTestId('mobile-sticky-footer');
  await expect(stickyFooter).toBeVisible();
  await expect(stickyFooter.getByText('Monthly EMI')).toBeVisible();

  // 2. Open the Hamburger Menu (Since it's a list now)
  const menuBtn = page.getByRole('button', { name: /Menu/i }).or(stickyFooter.locator('button'));
  await menuBtn.click();

  // 3. Click "View Analysis" from the vertical list
  await page.getByRole('button', { name: /View Analysis/i }).click();

  // 4. Verify Chart is visible
  const chartTitle = page.getByRole('heading', { name: /Equity Growth/i });
  await expect(chartTitle).toBeVisible({ timeout: 10000 });

  // 5. Verify Sidebar Inputs are hidden (since we are in Analysis tab)
  const sidebar = page.locator('aside');
  await expect(sidebar).toBeHidden();
});