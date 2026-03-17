import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

export const test = base.extend({
  loginAsAdmin: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto('/login');
    await loginPage.login('admin', 'password');
    await use(page);
  }
});
