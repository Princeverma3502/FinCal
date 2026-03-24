import { test, expect } from '@playwright/test';

// --- DESKTOP SECTION ---
test.describe('Desktop Tests', () => {
  // Ensure this block ONLY runs on desktop browsers
  test.skip(({ isMobile }) => isMobile, 'Desktop tests only');

  test('Verify Branding, Calculations, and Navbar Exports', async ({ page }) => {
    await page.goto('/');

    // 1. Branding
    await expect(page).toHaveTitle(/FinCal | Mortgage Pro/i);

    // 2. Calculation Logic (Added forced wait for Safari/CI stability)
    const emiDisplay = page.locator('.privacy-sensitive').first();
    const initialEmi = await emiDisplay.innerText();
    
    const interestInput = page.getByRole('spinbutton').nth(1);
    await interestInput.click();
    await interestInput.fill('12');
    await interestInput.blur(); // Triggering blur often helps React state updates
    await interestInput.press('Enter');

    // Wait for the value to actually change
    await expect(emiDisplay).not.toHaveText(initialEmi, { timeout: 15000 });

    // 3. Desktop Exports
    await expect(page.getByLabel('Desktop Export PDF')).toBeVisible();
  });
});

// --- MOBILE SECTION ---
test.describe('Mobile Tests', () => {
  // Ensure this block ONLY runs on mobile browsers
  test.skip(({ isMobile }) => !isMobile, 'Mobile tests only');

  test('Verify Mobile Menu and Sticky Footer', async ({ page }) => {
    await page.goto('/');

    // 1. Sticky Footer visibility
    const footer = page.getByTestId('mobile-sticky-footer');
    await expect(footer).toBeVisible({ timeout: 10000 });

    // 2. Hamburger Menu & Toggle
    await page.getByLabel('Open Menu').click();
    
    const privacyBtn = page.getByRole('button', { name: /Toggle Privacy/i }).first();
    // Wait for menu transition to finish
    await expect(privacyBtn).toBeVisible({ timeout: 10000 });
    
    await privacyBtn.click();
    await expect(page.locator('html')).toHaveClass(/privacy-mode/);
  });
});