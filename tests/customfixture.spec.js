import { test, expect } from '../fixtures/customFixtures';

test('admin can access dashboard', async ({ loginAsAdmin, dashboardPage }) => {
  await loginAsAdmin.goto('/admin');
  expect(await dashboardPage.getDashboardTitle()).toContain('Dashboard');
});

test('user sees product details', async ({ loginAsUser, dummyProduct }) => {
  await loginAsUser.goto(`/product/${dummyProduct.id}`);
  expect(await loginAsUser.locator('h1')).toContainText(dummyProduct.name);
});

test('API returns user data', async ({ apiClient, testUser }) => {
  const res = await apiClient.get(`/users/${testUser.username}`);
  expect(res.status).toBe(200);
  expect(res.data.username).toBe(testUser.username);
});

test('load page with saved login state', async ({ pageWithStorage }) => {
  await pageWithStorage.goto('/admin');
  expect(await pageWithStorage.locator('h1')).toHaveText('Dashboard');
});
