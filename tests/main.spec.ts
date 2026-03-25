import { test, expect } from '@playwright/test';

test.describe('FinCal Comprehensive Suite', () => {

  // ═══════════════════════════════════════════════════════════
  // DESKTOP TESTS
  // ═══════════════════════════════════════════════════════════
  test.describe('Desktop Tests', () => {
    test.skip(({ isMobile }) => isMobile, 'Desktop only');

    test('Page loads with all key sections visible', async ({ page }) => {
      await page.goto('/');
      
      // Navbar
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.getByText('FinCal')).toBeVisible();
      
      // Navbar buttons
      await expect(page.locator('nav').getByRole('button', { name: /share/i })).toBeVisible();
      await expect(page.locator('nav').getByRole('button', { name: /export pdf/i })).toBeVisible();
      
      // Input sidebar controls
      await expect(page.getByText(/Home Price/i)).toBeVisible();
      await expect(page.getByText(/Interest Rate/i)).toBeVisible();
      await expect(page.getByText(/Tenure/i)).toBeVisible();
    });

    test('Input changes update EMI calculation', async ({ page }) => {
      await page.goto('/');
      
      // Get initial EMI value
      const statCards = page.locator('h3.text-lg, h3.text-2xl').first();
      const initialText = await statCards.innerText();
      
      // Change interest rate
      const interestInput = page.locator('#interest-rate');
      await interestInput.fill('12');
      await interestInput.press('Enter');
      
      // EMI should change
      await expect(statCards).not.toHaveText(initialText, { timeout: 10000 });
    });

    test('StatCards display correctly', async ({ page }) => {
      await page.goto('/');
      
      // Check all stat card titles exist
      await expect(page.getByText('Monthly EMI')).toBeVisible();
      await expect(page.getByText('Total Interest')).toBeVisible();
      await expect(page.getByText('Payoff Date')).toBeVisible();
    });

    test('Payment Breakdown chart renders', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByText('Payment Breakdown')).toBeVisible();
    });

    test('Freedom Goal tracker renders and slider works', async ({ page }) => {
      await page.goto('/');
      
      await expect(page.getByText('Freedom Goal')).toBeVisible();
      await expect(page.getByText('Total Monthly Required')).toBeVisible();
      
      // Target year slider should be interactive
      const slider = page.locator('.accent-indigo-400');
      await expect(slider).toBeVisible();
    });

    test('Tax Benefits section renders', async ({ page }) => {
      await page.goto('/');
      
      await expect(page.getByText('Tax Benefits')).toBeVisible();
      await expect(page.getByText('Tax Bracket')).toBeVisible();
      await expect(page.getByText('Est. Yearly Tax Saving')).toBeVisible();
      await expect(page.getByText('Total Lifetime Savings')).toBeVisible();
      await expect(page.getByText('Effective Interest Paid')).toBeVisible();
    });

    test('Affordability Meter renders with DTI', async ({ page }) => {
      await page.goto('/');
      
      await expect(page.getByText('Debt-to-Income (DTI)')).toBeVisible();
      // Should show the DTI percentage and a risk level label
      await expect(page.getByText(/\d+\.\d+%/)).toBeVisible();
    });

    test('Rent vs Buy analysis renders', async ({ page }) => {
      await page.goto('/');
      
      await expect(page.getByText('Rent vs. Buy')).toBeVisible();
      await expect(page.getByText(/Estimated monthly renting cost/i)).toBeVisible();
    });

    test('Equity Growth chart renders', async ({ page }) => {
      await page.goto('/');
      
      await expect(page.getByText('Equity Growth')).toBeVisible();
    });

    test('Balance Projection Curve renders', async ({ page }) => {
      await page.goto('/');
      
      await expect(page.getByText('Balance Projection Curve')).toBeVisible();
      await expect(page.getByText('Visualization of debt reduction over time.')).toBeVisible();
    });

    test('Scenario Comparison renders', async ({ page }) => {
      await page.goto('/');
      
      await expect(page.getByText('Scenario Comparison')).toBeVisible();
      await expect(page.getByText('Monthly Change')).toBeVisible();
      await expect(page.getByText('Interest Impact')).toBeVisible();
    });

    test('Amortization Table renders with data', async ({ page }) => {
      await page.goto('/');
      
      // Table should be visible on desktop
      const table = page.locator('table').first();
      await expect(table).toBeVisible({ timeout: 10000 });
    });

    test('Privacy Toggle works', async ({ page }) => {
      await page.goto('/');
      
      const privacyBtn = page.locator('nav').getByRole('button', { name: /privacy/i });
      await privacyBtn.click();
      
      // Should add privacy-mode class to html
      await expect(page.locator('html')).toHaveClass(/privacy-mode/);
      
      // Click again to disable
      await privacyBtn.click();
      await expect(page.locator('html')).not.toHaveClass(/privacy-mode/);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // MOBILE TESTS
  // ═══════════════════════════════════════════════════════════
  test.describe('Mobile Tests', () => {
    test.skip(({ isMobile }) => !isMobile, 'Mobile only');

    test('Page loads and shows mobile tab navigation', async ({ page }) => {
      await page.goto('/');
      
      // Mobile tab bar should be visible
      await expect(page.getByText('Inputs')).toBeVisible();
      await expect(page.getByText('Analysis')).toBeVisible();
      await expect(page.getByText('Table')).toBeVisible();
    });

    test('Hamburger menu opens and contains actions', async ({ page }) => {
      await page.goto('/');
      
      // Open hamburger menu
      await page.locator('nav button').last().click();
      
      // Verify buttons inside menu
      await expect(page.getByRole('button', { name: /export pdf/i })).toBeVisible();
    });

    test('Tab navigation switches content', async ({ page }) => {
      await page.goto('/');
      
      // Default tab is Inputs - should see Home Price
      await expect(page.getByText(/Home Price/i)).toBeVisible();
      
      // Switch to Analysis tab
      await page.getByText('Analysis').click();
      await expect(page.getByText('Monthly EMI')).toBeVisible();
      
      // Switch to Table tab
      await page.getByText('Table').click();
      await expect(page.locator('table').first()).toBeVisible({ timeout: 10000 });
    });

    test('Inputs tab shows all sidebar components', async ({ page }) => {
      await page.goto('/');
      
      // Should show input controls
      await expect(page.getByText(/Home Price/i)).toBeVisible();
      await expect(page.getByText('Payment Breakdown')).toBeVisible();
      
      // Scroll down to see more components
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      
      // Freedom Goal, Tax Benefits, etc should be in the page
      await expect(page.getByText('Freedom Goal')).toBeVisible({ timeout: 5000 });
    });

    test('Analysis tab shows charts and comparison', async ({ page }) => {
      await page.goto('/');
      
      // Switch to Analysis
      await page.getByText('Analysis').click();
      
      await expect(page.getByText('Equity Growth')).toBeVisible();
      await expect(page.getByText('Balance Projection Curve')).toBeVisible();
      
      // Scroll to see scenario comparison
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(page.getByText('Scenario Comparison')).toBeVisible({ timeout: 5000 });
    });
  });
});