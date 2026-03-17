import { chromium } from '@playwright/test';

/**
 * Creates multiple browser contexts
 * @param {number} count - Number of contexts to create
 * @param {object} options - Optional launch/newContext options
 * @returns {Promise<{ browser, contexts: BrowserContext[] }>}
 */
async function getBrowserContexts(count = 1, options = {}) {
  const browser = await chromium.launch({ headless: true });

  const contexts = await Promise.all(
    Array.from({ length: count }).map(() =>
      browser.newContext(options)
    )
  );

  return { browser, contexts };
}

module.exports = { getBrowserContexts };
