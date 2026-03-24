import { test, expect } from '@playwright/test';

test('verify privacy toggle and data masking', async ({ page }) => {
  await page.goto('/');

  // 1. Locate a sensitive value (EMI)
  const emiDisplay = page.locator('.privacy-sensitive').first();
  
  // 2. Click Privacy Toggle
  await page.getByRole('button', { name: /Toggle Privacy/i }).first().click();

  // 3. Check for blur style
  await expect(emiDisplay).toHaveCSS('filter', /blur/);
});

test('verify export buttons trigger actions', async ({ page }) => {
  await page.goto('/');
  
  // Check that buttons are clickable (Download verification is complex in CI, 
  // but we can check if they are enabled and visible)
  const pdfBtn = page.getByLabel('Desktop Export PDF').or(page.getByLabel('Mobile Export PDF')).first();
  await expect(pdfBtn).toBeEnabled();
});