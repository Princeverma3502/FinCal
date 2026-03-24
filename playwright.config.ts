import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Increase global timeout to 60s for CI stability */
  timeout: 60000, 
  expect: { 
    timeout: 10000 
  },
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Give it a second chance on flaky runners */
  retries: process.env.CI ? 2 : 0, 
  /* Opt out of parallel tests on CI to reduce flakiness if needed */
  workers: process.env.CI ? 1 : undefined,

  /* REPORTER SETUP: 
     This ensures the 'playwright-report' folder is created even on PASS.
  */
  reporter: [
    ['html', { open: 'never' }],
    ['list'] // Provides nice terminal output while running
  ],

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'on-first-retry',
    /* Helpful for debugging mobile layout issues */
    screenshot: 'only-on-failure',
  },

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    stdout: 'pipe',
    stderr: 'pipe',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});