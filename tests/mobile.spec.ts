import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['iPhone 14'] });

test('mobile navigation and charts visibility', async ({ page }) => {
  await page.goto('/');

  // 1. Verify sticky footer is visible
  const stickyFooter = page.getByTestId('mobile-sticky-footer');
  await expect(stickyFooter).toBeVisible();

  // 2. Open the Hamburger Menu using aria-label
  // This is more reliable than name: /Menu/i
  const menuBtn = page.getByLabel('Open Menu').first();
  await menuBtn.click();

  // 3. Click "View Analysis" from the vertical list
  // Use exact match to avoid confusion with other text
  const analysisLink = page.getByRole('button', { name: 'View Analysis', exact: true });
  await expect(analysisLink).toBeVisible();
  await analysisLink.click();

  // 4. Verify Chart is visible
  await expect(page.getByText('Equity Growth')).toBeVisible({ timeout: 10000 });

  // 5. Verify Sidebar is hidden
  await expect(page.locator('aside')).toBeHidden();
});