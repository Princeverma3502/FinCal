import { test, expect } from '@playwright/test';

test.describe('Mortgage Calculations', () => {
  test('should update EMI when interest rate changes', async ({ page }) => {
    await page.goto('/');

    // Get initial EMI value
    const initialEmiText = await page.locator('.privacy-sensitive').first().innerText();
    
    // Change Interest Rate Input
    const interestInput = page.locator('input[type="number"]').nth(1); // Assuming 2nd input is interest
    await interestInput.fill('10');
    await interestInput.dispatchEvent('change');

    // Verify EMI has changed
    const updatedEmiText = await page.locator('.privacy-sensitive').first().innerText();
    expect(initialEmiText).not.toBe(updatedEmiText);
  });

  test('privacy toggle should blur sensitive values', async ({ page }) => {
    await page.goto('/');
    
    // Click Privacy Toggle (Targeting the button in the shared component)
    await page.getByRole('button', { name: /toggle privacy/i }).first().click();
    
    // Check if the privacy-mode class is applied to the body or container
    const sensitiveElement = page.locator('.privacy-sensitive').first();
    await expect(sensitiveElement).toHaveCSS('filter', /blur/);
  });
});