import {test, expect} from '@playwright/test'
import {getLoggedInPages} from '../utils/contextFactory'

test('simulate 2 users concurrently using POM', async () => {
  const credentials = [
    { username: 'admin', password: 'admin123' },
    { username: 'user1', password: 'userpass123' },
  ];

  const { browser, pages } = await getLoggedInPages(2, credentials);

  const [adminPage, userPage] = pages;

  await adminPage.goto('https://your-site.com/admin');
  await userPage.goto('https://your-site.com/profile');

  expect(await adminPage.locator('h1')).toContainText('Dashboard');
  expect(await userPage.locator('h2')).toContainText('Your Profile');

  await browser.close();
});
