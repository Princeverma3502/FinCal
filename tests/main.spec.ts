import { test, expect, devices } from '@playwright/test';

// --- DESKTOP SECTION ---
test.describe('Desktop Tests', () => {
  // We set the viewport at the top of this describe block
  test.use({ viewport: { width: 1440, height: 900 } });

  test('Verify Branding, Calculations, and Navbar Exports', async ({ page }) => {
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

    // 3. Desktop Exports (Verify they are present on Laptop)
    await expect(page.getByLabel('Desktop Export PDF')).toBeVisible();
    
    // 4. Privacy Toggle
    await page.getByRole('button', { name: /Toggle Privacy/i }).first().click();
    await expect(page.locator('html')).toHaveClass(/privacy-mode/);
  });
});

// --- MOBILE SECTION ---
// Note: We use a separate top-level block for Mobile to avoid worker conflicts
test.describe('Mobile Tests', () => {
  // Use the iPhone 12 profile
  test.use({ ...devices['iPhone 12'] });

  test('Verify Mobile Menu, Sticky Footer, and Safari Stability', async ({ page }) => {
    await page.goto('/');

    // 1. Sticky Footer visibility
    await expect(page.getByTestId('mobile-sticky-footer')).toBeVisible();

    // 2. Hamburger Menu & Animation Stability
    await page.getByLabel('Open Menu').click();
    
    // Targeted fix for the previous Safari Timeout:
    const mobilePdfBtn = page.getByLabel('Mobile Export PDF');
    await expect(mobilePdfBtn).toBeVisible({ timeout: 7000 });

    // 3. Tab Switching
    await page.getByRole('button', { name: 'Payment Table' }).click();
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('aside')).toBeHidden();
  });
});