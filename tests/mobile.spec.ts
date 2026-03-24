import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['iPhone 14'] });

test('mobile navigation and charts visibility', async ({ page }) => {
  await page.goto('/');

  // 1. Verify sticky footer EMI is visible (Using a broader text search)
  await expect(page.getByText('Monthly EMI')).toBeVisible();

  // 2. Click "Analysis" Tab 
  const analysisBtn = page.getByRole('button', { name: /Analysis/i });
  await analysisBtn.click();

  // 3. Verify Chart is now visible (Wait longer for dynamic chart load)
  const chartTitle = page.getByRole('heading', { name: /Equity Growth/i });
  await expect(chartTitle).toBeVisible({ timeout: 7000 });

  // 4. Verify Sidebar Inputs are now hidden on mobile
  const sidebar = page.locator('aside');
  await expect(sidebar).toBeHidden();
});