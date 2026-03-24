import { test, expect } from '@playwright/test';

test.describe('Mortgage Calculations', () => {
  test('should update EMI when inputs change', async ({ page }) => {
    await page.goto('/');

    // Target the EMI display
    const emiDisplay = page.locator('.privacy-sensitive').first();
    const initialEmiText = await emiDisplay.innerText();
    
    // Change Interest Rate Input (Using a more robust selector)
    const interestInput = page.getByRole('spinbutton').nth(1); 
    await interestInput.click();
    await interestInput.fill('12');
    await interestInput.press('Enter'); // Forces state update in React

    // Wait for the calculation to actually result in a different value
    await expect(emiDisplay).not.toHaveText(initialEmiText, { timeout: 10000 });
  });
});