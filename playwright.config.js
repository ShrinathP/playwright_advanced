import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    // Setup project
    {
      name: 'setup',
      testDir: './tests-customlauncher/setuptests', // 👈 specify your test folder here
      testMatch: /.*\.setup\.js/,
      use: { 
        // ...devices["Desktop Chrome"],
        // using my local chromium browser
        browserName: 'chromium',
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // <-- your local path
      },
      teardown: 'cleanup db'
    },
    {
      name: 'cleanup db',
      testMatch: /.*\.teardown\.js/,
    },
    {
      name: 'chromium',
      testDir: './tests-customlauncher/setuptests',
      testMatch: /.*\.spec\.js$/, // run only .spec.js files in this project
      use: {
        // ...devices['Desktop Chrome'],
        // using my local chromium browser
        browserName: 'chromium',
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // <-- your local path
        // Use prepared auth state.
        storageState: './storageauth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});