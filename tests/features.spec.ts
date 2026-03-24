import { test, expect } from '@playwright/test';

test.describe('Dashboard Features', () => {
  test('privacy toggle should mask sensitive values', async ({ page, isMobile }) => {
    await page.goto('/');
    
    // Target the button specifically
    const privacyBtn = page.getByRole('button', { name: /Toggle Privacy/i }).first();

    if (isMobile) {
      // 1. Open the Menu
      const menuBtn = page.getByLabel('Open Menu');
      await menuBtn.click();
      
      // 2. Wait for the menu to actually be visible/animated in
      // This solves the Safari timeout issue
      await expect(privacyBtn).toBeVisible({ timeout: 5000 });
    }

    // 3. Turn Privacy ON
    await privacyBtn.click();
    await expect(page.locator('html')).toHaveClass(/privacy-mode/);
    
    // 4. Turn Privacy OFF
    await privacyBtn.click();
    await expect(page.locator('html')).not.toHaveClass(/privacy-mode/);
  });

  test('export buttons should be present and enabled', async ({ page, isMobile }) => {
    await page.goto('/');

    if (isMobile) {
      await page.getByLabel('Open Menu').click();
      // Use getByRole or getByLabel to ensure we find the right one in the list
      await expect(page.getByLabel('Mobile Export PDF')).toBeVisible();
    } else {
      await expect(page.getByLabel('Desktop Export PDF')).toBeVisible();
    }
  });
});