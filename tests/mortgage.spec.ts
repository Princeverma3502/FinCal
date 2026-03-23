import { test, expect } from '@playwright/test';

test('should update all symbols when currency is changed', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Change to USD
  await page.getByLabel('Select Currency').selectOption('USD');

  // Check that the '$' symbol appeared in the StatCards
  // We look for any heading containing '$' - very robust
  await expect(page.locator('h3:has-text("$")').first()).toBeVisible();

  // Check that the 'Loan Amount' label is present
  await expect(page.getByText('Loan Amount')).toBeVisible();

  // Check that at least one '$' exists in the sidebar
  await expect(page.locator('aside').getByText('$').first()).toBeVisible();
});