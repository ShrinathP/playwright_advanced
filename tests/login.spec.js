import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';

test('Login test with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto('/login');
  await loginPage.login('wrong', 'wrongpass');

  expect(await page.locator('.error-message')).toBeVisible();
});
