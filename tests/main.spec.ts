import { test, expect, devices } from '@playwright/test';

test.describe('FinCal Comprehensive Suite', () => {
  
  // DESKTOP / LAPTOP TESTS
  test.describe('Desktop Viewport', () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test('Verify Branding, Calculations, and Exports', async ({ page }) => {
      await page.goto('/');

      // 1. Branding & Favicon
      await expect(page).toHaveTitle(/FinCal | Mortgage Pro/i);
      const favicon = await page.locator('link[rel="icon"]').first().getAttribute('href');
      expect(favicon).toContain('icon.png');

      // 2. Calculation Logic
      const emiDisplay = page.locator('.privacy-sensitive').first();
      const initialEmi = await emiDisplay.innerText();
      const interestInput = page.getByRole('spinbutton').nth(1);
      await interestInput.fill('12');
      await interestInput.press('Enter');
      await expect(emiDisplay).not.toHaveText(initialEmi, { timeout: 10000 });

      // 3. Desktop Exports
      await expect(page.getByLabel('Desktop Export PDF')).toBeVisible();
      
      // 4. Privacy Toggle
      await page.getByRole('button', { name: /Toggle Privacy/i }).first().click();
      await expect(page.locator('html')).toHaveClass(/privacy-mode/);
    });
  });

  // MOBILE TESTS
  test.describe('Mobile Viewport', () => {
    test.use({ ...devices['iPhone 12'] });

    test('Verify Mobile Menu, Sticky Footer, and Safari Stability', async ({ page }) => {
      await page.goto('/');

      // 1. Sticky Footer visibility
      await expect(page.getByTestId('mobile-sticky-footer')).toBeVisible();

      // 2. Hamburger Menu & Animation Stability
      await page.getByLabel('Open Menu').click();
      const mobilePdfBtn = page.getByLabel('Mobile Export PDF');
      
      // Force wait for menu animation - fixes the Safari Timeout
      await expect(mobilePdfBtn).toBeVisible({ timeout: 7000 });

      // 3. Tab Switching
      await page.getByRole('button', { name: 'Payment Table' }).click();
      await expect(page.locator('table')).toBeVisible();
      await expect(page.locator('aside')).toBeHidden();
    });
  });
});