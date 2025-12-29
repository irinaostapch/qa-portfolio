import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  retries: 1,
  
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  
  projects: [
    // UI test (Sauce Demo)
    {
      name: 'sauce-demo-chrome',
      testDir: './tests/ui', 
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
      },
    },
    
    // API tests (JSONplaceholder)
    {
      name: 'jsonplaceholder-api',
      use: {
        baseURL: 'https://jsonplaceholder.typicode.com',
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
        }
      },
      testDir: './tests/api',
      testMatch: '**/*jsonplaceholder-api*.spec.ts'
    },
  ],
});
