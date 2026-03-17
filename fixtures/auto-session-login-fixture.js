import { test as base } from '@playwright/test';
let sessionCreated = false;

export const test = base.extend({
  loginOnce: async ({ browser }, use) => {
    const storagePath = 'storage/admin.json';

    if (!sessionCreated && !fs.existsSync(storagePath)) {
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto('https://your-site.com/login');
      await page.fill('#username', 'admin');
      await page.fill('#password', 'admin123');
      await page.click('#loginBtn');
      await page.waitForURL('**/dashboard');

      await context.storageState({ path: storagePath });
      await context.close();
      sessionCreated = true;
    }

    const context = await browser.newContext({ storageState: storagePath });
    const page = await context.newPage();
    await use(page);
    await context.close();
  }
});
