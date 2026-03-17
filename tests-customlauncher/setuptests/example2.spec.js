import { test, expect } from '@playwright/test';

test.beforeEach(async() => {
  console.log("Before Each Run");
})

test.beforeAll(async() => {
  console.log("Before All ");
})

test.afterAll(async() => {
  console.log("Teardown");
})

test.afterEach(async() => {
  console.log("After Each");

})



test('test', async ({ page }) => {
  
  const cookies = await page.context().cookies();
  console.log('Cookies in chromium project:', cookies);
  await page.goto('https://www.saucedemo.com/inventory.html')
  //Should open the page as we have the cookies set in setup.js setup using dependencies

  // page is authenticated
  await page.waitForSelector('#add-to-cart-sauce-labs-backpack');
  expect(await page.title()).toBe('Swag Labs');

});

test('test2', async ({ page }) => {
  const cookies = await page.context().cookies();
  console.log('Cookies in chromium project:', cookies);
});