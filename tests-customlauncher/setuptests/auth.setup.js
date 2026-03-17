import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('dirname', __dirname);


const authFile = path.join(__dirname, '../../storageauth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  // await page.getByTestId('royal-login-button').click();
  await page.locator('#login-button').click();


  
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  // Waiting for Search input on facebook
  // await page.waitForSelector('input[placeholder="Search Facebook"]');
  await page.waitForSelector('#add-to-cart-sauce-labs-backpack');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  
  // or wait for cookies set using
  // await page.waitForFunction(() => {
  //   return document.cookie.includes('session_id=') &&
  //          document.cookie.includes('user_token=');
  // });

  expect(await page.title()).toBe('Swag Labs');


  // End of authentication steps.
   // write storage and session data to disk
  await page.context().storageState({ path: authFile });


    // // ✅ Clean up
    // await context.close(); // optional but good
    // await browser.close(); // strongly recommended

    // Don't close page unless you need it absolutely
});