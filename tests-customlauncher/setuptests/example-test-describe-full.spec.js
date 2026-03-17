import { test, expect } from '@playwright/test';

// Apply config at file level using test.describe.configure
test.describe.configure({ retries: 2, timeout: 20_000 });

test.describe('Main Test Suite - User Flow', () => {
  
  // Hooks at top-level describe
  test.beforeAll(async () => {
    console.log('Before all tests - setup global state');
  });

  test.afterAll(async () => {
    console.log('After all tests - clean up global state');
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
  });

  test.afterEach(async () => {
    console.log('Test finished');
  });

  test('Sanity check - page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test.describe('Nested Describe - Login Flow', () => {
    
    test.beforeAll(async () => {
      console.log('Nested: Before all login tests');
    });

    test.afterAll(async () => {
      console.log('Nested: After all login tests');
    });

    test('Valid login', async ({ page }) => {
      // Test implementation
      await expect(page.locator('h1')).toHaveText('Example Domain');
    });

    test('Invalid login', async ({ page }) => {
      test.info().annotations.push({ type: 'tag', description: 'negative' });
      await expect(page.locator('h1')).toHaveText('Example Domain'); 
    });

    test.skip('Skipped test - login edge case', async ({ page }) => {
      // This test will be skipped
    });

    test.fixme('Fixme test - login recovery flow', async ({ page }) => {
      // This test is marked for fixing
    });
  });

  test.describe('Nested Describe - Dashboard Flow', () => {
    test('Load dashboard', async ({ page }) => {
      test.info().annotations.push({ type: 'tag', description: 'dashboard' });
      await expect(page.locator('h1')).toHaveText('Example Domain');
    });

    test.slow('Slow test - analytics load', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText('Example Domain');
    });

    test.only('Only test - critical report check', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText('Example Domain');
    });
  });

});

// Test with colorScheme applied using context options
test.describe('Dark mode test', () => {
  test.use({ colorScheme: 'dark' });

  test('Validate dark mode appearance', async ({ page }) => {
    await page.goto('https://example.com');
    // Normally you'd validate dark mode UI here
    await expect(page.locator('h1')).toHaveText('Example Domain');
  });
});
