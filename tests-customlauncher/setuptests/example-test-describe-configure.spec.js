
import { test, expect } from '@playwright/test';
// Each test in the file will be retried twice and have a timeout of 20 seconds.
test.describe.configure({ retries: 2, timeout: 20_000 });
test('runs first', async ({ page }) => {});
test('runs second', async ({ page }) => {});


// Nesting Test Describe Configure
test.describe.configure({ mode: 'parallel' });
test.describe('A, runs in parallel with B', () => {
  test.describe.configure({ mode: 'default' });
  test('in order A1', async ({ page }) => {});
  test('in order A2', async ({ page }) => {});
});

test.describe('B, runs in parallel with A', () => {
  test.describe.configure({ mode: 'default' });
  test('in order B1', async ({ page }) => {});
  test('in order B2', async ({ page }) => {});
});