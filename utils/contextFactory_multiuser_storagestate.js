import { chromium, firefox, webkit } from '@playwright/test';
import path from 'path';

const browserEngines = { chromium, firefox, webkit };

/**
 * Launch a browser and return named browser contexts
 * @param {object} config
 * @param {'chromium'|'firefox'|'webkit'} config.browserName
 * @param {object} config.launchOptions - options for browserType.launch()
 * @param {object} config.contextOptions - options for browser.newContext()
 * @param {object} config.users - key-value pairs like { admin: storagePath, user: storagePath }
 * @returns {Promise<{ browser, contexts: Record<string, BrowserContext> }>}
 */
async function getNamedBrowserContexts({
  browserName = 'chromium',
  launchOptions = {},
  contextOptions = {},
  users = {} // e.g., { admin: 'storage/admin.json', user: 'storage/user.json' }
}) {
  const browserType = browserEngines[browserName] || chromium;
  const browser = await browserType.launch(launchOptions);

  const contexts = {};
  for (const [role, storagePath] of Object.entries(users)) {
    const ctx = await browser.newContext({
      ...contextOptions,
      ...(storagePath ? { storageState: path.resolve(storagePath) } : {})
    });
    contexts[role] = ctx;
  }

  return { browser, contexts };
}

export { getNamedBrowserContexts };
