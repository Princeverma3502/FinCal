import { test, expect } from '@playwright/test';

test.describe('FinCal Comprehensive Suite', () => {
  
  // --- DESKTOP ---
  test.describe('Desktop Tests', () => {
    test.skip(({ isMobile }) => isMobile, 'Desktop only');

    test('Navbar and Calculations', async ({ page }) => {
      await page.goto('/');
      // Verify Share button is visible in navbar
      await expect(page.getByRole('button', { name: /share/i })).toBeVisible();
      
      // Verification of Calculation
      const emiDisplay = page.locator('.privacy-sensitive').first();
      const initialEmi = await emiDisplay.innerText();
      await page.getByRole('spinbutton').nth(1).fill('12');
      await page.getByRole('spinbutton').nth(1).press('Enter');
      await expect(emiDisplay).not.toHaveText(initialEmi, { timeout: 10000 });
    });
  });

  // --- MOBILE ---
  test.describe('Mobile Tests', () => {
    test.skip(({ isMobile }) => !isMobile, 'Mobile only');

    test('Menu, Export, and Scroll Share', async ({ page }) => {
      await page.goto('/');

      // 1. Scroll down and verify Share Button in Sticky Footer
      await page.evaluate(() => window.scrollTo(0, 500));
      const stickyShare = page.getByTestId('mobile-sticky-footer').getByRole('button', { name: /share/i });
      await expect(stickyShare).toBeVisible();

      // 2. Open Hamburger Menu
      await page.getByLabel('Open Menu').click();

      // 3. Verify Export PDF and Privacy Toggle are INSIDE the menu
      const exportBtn = page.locator('button:has-text("Export PDF")');
      const privacyBtn = page.locator('button:has-text("Toggle Privacy")');
      
      await expect(exportBtn).toBeVisible({ timeout: 5000 });
      await expect(privacyBtn).toBeVisible({ timeout: 5000 });

      // 4. Test Privacy Toggle
      await privacyBtn.click({ force: true });
      await expect(page.locator('html')).toHaveClass(/privacy-mode/);
    });
  });
});