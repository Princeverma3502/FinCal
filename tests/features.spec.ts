import { test, expect } from '@playwright/test';

test.describe('Dashboard Features', () => {
  test('privacy toggle should mask sensitive values', async ({ page, isMobile }) => {
    await page.goto('/');
    
    // If on mobile, the toggle is inside the hamburger menu
    if (isMobile) {
      await page.getByLabel('Open Menu').click();
    }

    const privacyBtn = page.getByRole('button', { name: /Toggle Privacy/i }).first();
    const emiDisplay = page.locator('.privacy-sensitive').first();
    
    // 1. Turn Privacy ON
    await privacyBtn.click();
    // Check for the class on the body/html and CSS filter
    await expect(page.locator('html')).toHaveClass(/privacy-mode/);
    
    // 2. Turn Privacy OFF
    await privacyBtn.click();
    await expect(page.locator('html')).not.toHaveClass(/privacy-mode/);
  });

  test('export buttons should be present and enabled', async ({ page, isMobile }) => {
    await page.goto('/');

    if (isMobile) {
      await page.getByLabel('Open Menu').click();
      await expect(page.getByLabel('Mobile Export PDF')).toBeVisible();
    } else {
      await expect(page.getByLabel('Desktop Export PDF')).toBeVisible();
    }
  });
});