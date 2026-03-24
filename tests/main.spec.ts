import { test, expect } from '@playwright/test';

// --- DESKTOP SECTION ---
test.describe('Desktop Tests', () => {
  test.skip(({ isMobile }) => isMobile, 'Desktop tests only');

  test('Verify Branding, Calculations, and Navbar Exports', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/FinCal | Mortgage Pro/i);

    const emiDisplay = page.locator('.privacy-sensitive').first();
    const initialEmi = await emiDisplay.innerText();
    
    const interestInput = page.getByRole('spinbutton').nth(1);
    await interestInput.click();
    await interestInput.fill('12');
    await interestInput.blur();
    await interestInput.press('Enter');

    // Wait for calculation to update
    await expect(emiDisplay).not.toHaveText(initialEmi, { timeout: 15000 });
    await expect(page.getByLabel('Desktop Export PDF')).toBeVisible();
  });
});

// --- MOBILE SECTION ---
test.describe('Mobile Tests', () => {
  test.skip(({ isMobile }) => !isMobile, 'Mobile tests only');

  test('Verify Mobile Menu and Privacy Toggle', async ({ page }) => {
    await page.goto('/');

    // 1. Check Sticky Footer
    await expect(page.getByTestId('mobile-sticky-footer')).toBeVisible({ timeout: 10000 });

    // 2. Open Menu
    await page.getByLabel('Open Menu').click();
    
    // 3. Resilient Locator for Safari
    // Using a text-based locator is more stable for Safari mobile transitions
    const privacyBtn = page.locator('button:has-text("Toggle Privacy")').first();
    
    // Wait for menu animation to settle
    await expect(privacyBtn).toBeVisible({ timeout: 10000 });
    
    // Force click to bypass any mid-animation overlay issues
    await privacyBtn.click({ force: true });
    
    await expect(page.locator('html')).toHaveClass(/privacy-mode/);
  });
});