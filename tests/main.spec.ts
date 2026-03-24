import { test, expect } from '@playwright/test';

test.describe('FinCal Comprehensive Suite', () => {
  
  test.describe('Desktop Tests', () => {
    test.skip(({ isMobile }) => isMobile, 'Desktop only');

    test('Navbar and Calculations', async ({ page }) => {
      await page.goto('/');
      // Desktop: Share button is in the top navbar
      await expect(page.locator('nav').getByRole('button', { name: /share/i })).toBeVisible();
      
      const emiDisplay = page.locator('.privacy-sensitive').first();
      const initialEmi = await emiDisplay.innerText();
      
      await page.getByRole('spinbutton').nth(1).fill('12');
      await page.getByRole('spinbutton').nth(1).press('Enter');
      
      await expect(emiDisplay).not.toHaveText(initialEmi, { timeout: 10000 });
    });
  });

  // ... existing desktop tests ...

  test.describe('Mobile Tests', () => {
    test.skip(({ isMobile }) => !isMobile, 'Mobile only');

    test('Menu, Export, and Scroll Share', async ({ page }) => {
      await page.goto('/');

      // 1. Scroll down and verify Sticky Footer
      await page.evaluate(() => window.scrollTo(0, 500));
      await expect(page.getByTestId('mobile-sticky-footer')).toBeVisible();

      // 2. Open Hamburger Menu 
      // FIX: Specify the button inside the <nav> element to avoid the duplicate in footer
      await page.locator('nav').getByLabel(/menu/i).click();

      // 3. Verify Buttons are inside the menu
      await expect(page.getByRole('button', { name: /share/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /export pdf/i })).toBeVisible();
      
      // 4. Test Privacy Toggle
      const privacyBtn = page.getByRole('button', { name: /privacy/i });
      await privacyBtn.click();
      await expect(page.locator('html')).toHaveClass(/privacy-mode/);
    });
  });
});