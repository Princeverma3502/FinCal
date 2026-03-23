import { test, expect } from '@playwright/test';

test.describe('Mortgage Dashboard Core Logic', () => {
  test.beforeEach(async ({ page }) => {
    // Increase timeout for initial page load in CI environments
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('should update EMI when principal changes', async ({ page }) => {
    // Target the first sensitive stat (usually Monthly EMI)
    const emiDisplay = page.locator('.privacy-sensitive').first();
    const initialEmi = await emiDisplay.innerText();

    // Use spinbutton role to strictly target the number input, avoiding the range slider
    const homePriceInput = page.getByRole('spinbutton', { name: /Home Price/i });
    
    // Clear and fill with a new value
    await homePriceInput.clear();
    await homePriceInput.fill('500000');
    
    // Allow calculation logic to fire (usually debounced or state-triggered)
    await page.waitForTimeout(500);
    
    // Verification: The text should have changed from the initial value
    await expect(emiDisplay).not.toHaveText(initialEmi);
  });

  test('should toggle privacy mode masking', async ({ page }) => {
    const privacyBtn = page.getByRole('button', { name: /Toggle Privacy/i });
    const html = page.locator('html');
    
    // 1. Click to turn Privacy Mode ON
    await privacyBtn.click();
    await expect(html).toHaveClass(/privacy-mode/);
    
    // 2. Click to turn Privacy Mode OFF
    await privacyBtn.click();
    await expect(html).not.toHaveClass(/privacy-mode/);
  });
});