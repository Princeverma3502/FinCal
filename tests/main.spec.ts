import { test, expect, devices } from '@playwright/test';

// --- DESKTOP SECTION ---
test.describe('Desktop Tests', () => {
  // Viewport changes are allowed in describe blocks as long as the browser type stays the same
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

    // 3. Desktop Exports
    await expect(page.getByLabel('Desktop Export PDF')).toBeVisible();
    
    // 4. Privacy Toggle
    await page.getByRole('button', { name: /Toggle Privacy/i }).first().click();
    await expect(page.locator('html')).toHaveClass(/privacy-mode/);
  });
});

// --- MOBILE SECTION ---
test.describe('Mobile Tests', () => {
  // FIX: Instead of test.use here, we set the metadata 
  // and ensure the playwright.config.ts handles the browser switch.
  
  test('Verify Mobile Menu, Sticky Footer, and Safari Stability', async ({ page, isMobile }) => {
    // If your config is set up for mobile-safari, this will run correctly.
    await page.goto('/');

    // 1. Sticky Footer visibility
    await expect(page.getByTestId('mobile-sticky-footer')).toBeVisible();

    // 2. Hamburger Menu & Animation Stability
    if (isMobile) {
        await page.getByLabel('Open Menu').click();
        const mobilePdfBtn = page.getByLabel('Mobile Export PDF');
        // Force wait for menu animation - specific fix for Safari timeouts
        await expect(mobilePdfBtn).toBeVisible({ timeout: 7000 });
    }

    // 3. Tab Switching
    await page.getByRole('button', { name: 'Payment Table' }).click();
    await expect(page.locator('table')).toBeVisible();
  });
});