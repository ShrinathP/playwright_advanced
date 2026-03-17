import { test, expect } from '../fixtures/auto-login-fixture';

test('admin can access dashboard', async ({ loginAsAdmin }) => {
  await loginAsAdmin.goto('/admin');
  expect(await loginAsAdmin.locator('h1')).toHaveText('Dashboard');
});
