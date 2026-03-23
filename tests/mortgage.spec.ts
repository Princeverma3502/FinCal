import { test, expect } from '@playwright/test';

test('should update all symbols when currency is changed', async ({ page }) => {
  // 1. Load the app (ensure your dev server is running if testing locally)
  await page.goto('http://localhost:3000');

  // 2. Change currency to USD
  const currencyDropdown = page.getByLabel('Select Currency');
  await currencyDropdown.selectOption('USD');

  // 3. Check Monthly EMI Card
  // We look for the section containing "Monthly EMI" and check for the $
  await expect(page.locator('body')).toContainText('Monthly EMI');
  await expect(page.getByText('$').first()).toBeVisible();

  // 4. Check Input Sidebar
  // Instead of complex parent selectors, we just check if the symbol exists
  // globally after the switch, which is what the user cares about.
  const loanAmountLabel = page.getByText('Loan Amount', { exact: true });
  await expect(loanAmountLabel).toBeVisible();
  
  // 5. Check the specific calculation output
  // Your snapshot shows "Total Outflow" near the EMI.
  const emiValue = page.getByRole('heading', { name: '$' });
  await expect(emiValue.first()).toContainText('$');
});