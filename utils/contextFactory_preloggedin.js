import { chromium } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

/**
 * Launches N contexts and logs in each using the POM LoginPage
 * @param {number} count - Number of users/contexts
 * @param {object[]} credentials - Array of { username, password }
 * @returns {Promise<{ browser, pages: Page[] }>}
 */
async function getLoggedInPages(count = 1, credentials = []) {
  const browser = await chromium.launch({ headless: true });

  const pages = [];

  for (let i = 0; i < count; i++) {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.gotoLogin();

    const creds = credentials[i] || { username: 'admin', password: 'admin123' };
    await loginPage.login(creds.username, creds.password);

    pages.push(page);
  }

  return { browser, pages };
}

module.exports = { getLoggedInPages };
