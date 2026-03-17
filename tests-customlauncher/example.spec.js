import { test, expect } from '@playwright/test';
import { launchBrowser } from '../utils/browserFactory.js';

test('use custom launch config if needed', async ({ browserName }) => {
  const executablePath = process.env.BROWSER_PATH || null;

  // Use custom launch if executable path is given, else use test runner browser
  const browser = executablePath
    ? await launchBrowser({ browserName, executablePath })
    : await test.browserType.launch();

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://example.com');
  const title = await page.title();
  await page.waitForTimeout(5000); // waits 2 seconds
  expect(title).toContain('Example');

  await browser.close();
});
