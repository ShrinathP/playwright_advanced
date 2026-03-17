import { chromium,firefox, webkit } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * Returns the browser type object.
 */
const getBrowserType = (name) => {
  const types = { chromium, firefox, webkit };
  return types[name] || chromium;
};

/**
 * Returns browser-specific launch options.
 */
const getLaunchOptions = (browserName, executablePath) => {
  const common = {
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  };

  switch (browserName) {
    case 'chromium':
      return {
        ...common,
        args: [
          '--disable-notifications',
          '--start-maximized',
          '--no-sandbox',
        ],
        // Optional: Use custom user data dir
        // userDataDir: path.resolve(__dirname, '../chrome-profile'),
      };

    case 'firefox':
      // Create a temporary custom Firefox profile dir
      const customProfileDir = path.join(__dirname, '../firefox-profile');
      if (!fs.existsSync(customProfileDir)) {
        fs.mkdirSync(customProfileDir);
      }
      return {
        ...common,
        firefoxUserPrefs: {
          'browser.download.folderList': 2,
          'browser.download.dir': '/tmp',
          'browser.helperApps.neverAsk.saveToDisk': 'application/pdf',
        },
        args: [`-profile`, customProfileDir],
      };

    case 'webkit':
      return {
        ...common,
        slowMo: 50, // visual feedback
        ignoreHTTPSErrors: true,
      };

    default:
      return common;
  }
};

/**
 * Launches a browser with custom config
 * @param {Object} options
 * @param {string} options.browserName - 'chromium' | 'firefox' | 'webkit'
 * @param {string} [options.executablePath] - Optional browser binary
 */
async function launchBrowser({ browserName = 'chromium', executablePath = null }) {
  const browserType = getBrowserType(browserName);
  const launchOptions = getLaunchOptions(browserName, executablePath);
  return await browserType.launch(launchOptions);
}

export { launchBrowser };
