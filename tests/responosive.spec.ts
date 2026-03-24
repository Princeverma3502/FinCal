import { test, expect, devices } from '@playwright/test';

test.describe('Responsive Layout Verification', () => {

  test('Desktop: Show Navbar Exports and Sidebar', async ({ page }) => {
    // Force Desktop Viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // 1. Check for Laptop-only Export Buttons
    await expect(page.getByLabel('Desktop Export PDF')).toBeVisible();
    await expect(page.getByLabel('Desktop Export CSV')).toBeVisible();

    // 2. Sidebar should be visible alongside content
    await expect(page.locator('aside')).toBeVisible();
    await expect(page.getByText('Equity Growth')).toBeVisible();
  });

  test('Mobile: Use Hamburger and verify List Menu', async ({ page }) => {
    // Force iPhone Viewport
    await page.setViewportSize(devices['iPhone 12'].viewport);
    await page.goto('/');

    // 1. Verify Sticky Footer for Mobile
    await expect(page.getByTestId('mobile-sticky-footer')).toBeVisible();

    // 2. Open Hamburger
    await page.getByLabel('Toggle Menu').click();

    // 3. Verify the vertical list items exist
    await expect(page.getByRole('button', { name: 'View Analysis' })).toBeVisible();
    await expect(page.getByLabel('Mobile Export PDF')).toBeVisible();

    // 4. Test Navigation to Table
    await page.getByRole('button', { name: 'Payment Table' }).click();
    await expect(page.locator('table')).toBeVisible();
  });
});