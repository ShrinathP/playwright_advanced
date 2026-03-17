import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { DashboardPage } from '../pages/dashboardPage.js';
import axios from 'axios';
import path from 'path';

// Dummy data for testUser and dummyProduct
const testUser = {
  username: 'test_user',
  password: 'userpass123'
};

const dummyProduct = {
  id: 101,
  name: 'Test Widget',
  price: 999
};

export const test = base.extend({

  /**
   * 🔐 loginAsAdmin — returns a logged-in page as admin
   */
  loginAsAdmin: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto('/login');
    await loginPage.login('admin', 'admin123');
    await use(page);
  },

  /**
   * 🧑‍💼 loginAsUser — returns a logged-in page as normal user
   */
  loginAsUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto('/login');
    await loginPage.login(testUser.username, testUser.password);
    await use(page);
  },

  /**
   * 👤 testUser — provides a test user object
   */
  testUser: async ({}, use) => {
    await use(testUser);
  },

  /**
   * 📦 dummyProduct — provides a fake product
   */
  dummyProduct: async ({}, use) => {
    await use(dummyProduct);
  },

  /**
   * 🧱 dashboardPage — reusable page object
   */
  dashboardPage: async ({ page }, use) => {
    const dashboard = new DashboardPage(page);
    await use(dashboard);
  },

  /**
   * 🔄 pageWithStorage — page launched with pre-auth storage
   */
  pageWithStorage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: path.resolve(__dirname, '../storage/admin.json')
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  /**
   * 🌐 apiClient — inject reusable Axios instance
   */
  apiClient: async ({}, use) => {
    const client = axios.create({
      baseURL: 'https://your-api.com/api',
      headers: {
        Authorization: 'Bearer hardcoded_or_env_token'
      }
    });
    await use(client);
  }

});
