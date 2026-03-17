# playwright_advanced
Everything Playwright
## Installation
Last Version of Playwright supporting nodejs 16
@playwright/test@1.40.1
Install full Playwright package with browser binaries
npm init playwright@1.40.1

create-playwright will always pull in the latest version so
above method wont work

npm init -y
# Install Playwright Test 1.40.1:
npm install -D @playwright/test@1.40.1
for mojave 1.17.1
# install browser binaries
npx playwright install
# add test script to package.json
"scripts": {
  "test": "npx playwright test"
}
# run the test
npm test
# Optional: Generate playwright.config.js Manually
npx playwright test --init


# Run All Tests in the tests folder
npx playwright test
# Run Specific Test
npx playwright test tests/example.spec.js
# Run Specific Test using custom launcher browserfactory
# On macOS
BROWSER_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npx playwright test tests-customlauncher/example.spec.js --project=chromium --headed
# On Linux
BROWSER_PATH="/usr/bin/google-chrome" npx playwright test --project=chromium




# ECMA vs CommonJS
# Also prefer using ECMA syntax, (import/export) instead of CommonJS
instead of const { num } = require('')  and module.exports
package.json needs to declare type
Your package.json needs to declare "type": "module"
{
  "type": "module",
  "scripts": {
    "test": "playwright test"
  },
  ...
}

but all require('..') calls will stop working

# Issue when you pass config object in defineConfig as parameter
playwright TypeError: defineConfig is not a function

# defineConfig wasnt available in playwright <=1.21 versions
use module exports or esm export { function } 


# correct way to export in ESM module
✅ 1. Named Export Inline
export async function launchBrowser(options) {
  // your logic
}

✅ 2. Named Export at End
async function launchBrowser(options) {
  // logic
}
export { launchBrowser }; // ✅ this says “export this named function”

✅ 3. Default Export
async function launchBrowser(options) {
  // logic
}

export default launchBrowser;


# Importing a named export
//module1.js

export function function1() {
  console.log('f1')
}

export function function2() {
  console.log('f2')
}

export default function1;

And then:

import defaultExport, { function1, function2 } from './module1'

defaultExport();  // This calls function1
function1();
function2();


# enhancing the browserFactoryConfig by adding Launch Options
browserfactory

# Why use chromium instead of chrome
Chromium has better privacy, customization and no tracking

# Edge is chromium based browser, so no need to test edge separately
Microsoft Edge browser is built upon the Chromium open-source project. This means it shares the same underlying technology and engine as Google Chrome.

# Custom Fixture
customFixtures.js is used to extend or override Playwright’s built-in test fixtures. Fixtures in Playwright are reusable setup/teardown logic, like logging in, creating users, connecting to databases, etc.

With customFixtures.js, you can:
* Share context-aware logic across tests
* Create authenticated sessions
* Inject custom data (e.g., test users, tokens, page objects)
* Replace default page, context, or browser

Typical Uses of customFixtures.js in Real Projects
Auto login (loginAsUser, loginAsAdmin)
Provide test data (testUser, dummyProduct)
Inject reusable objects (apiClient, pageObjects)
Preload state (storageState)

# Format
const test = base.extend({
  loginAsAdmin: {
    await use(page)
  }
})
Whatever  you pass in the use will be used in your spec.js file

# BrowserContexts (Session Isolation) are powerful - in one instance you can create multiple contexts all non shareable
In Playwright, two different BrowserContext instances are just like opening two separate Chrome profiles:
* Each has its own cookies, localStorage, sessionStorage, cache, etc.
* They don’t share login states, tabs, or history.
* But they run within the same browser process, making them much lighter and faster than launching full browser instances like Selenium does.

* to check parallel role based test flows 
* multi auth access testing
* Load Testing


# BrowserContext - for multiple auth testing
Multiple Auth Testing
https://www.youtube.com/watch?v=OI2CwDedKQk

YOu can create preloggedin contexts as well
check contextFactory_preloggedin

# Using storageState to save user profile and info
check contextFactory_multiuser_storagestate


# Upgrading to Playwright 1.35.1 as it supports storageStage
Steps
1. rm -rf node_modules package-lock.json
2. npm install -D @playwright/test@1.35.1
3. npx playwright install  (installs brower binaries)


Playwright Auth
https://playwright.dev/docs/auth#basic-shared-account-in-all-tests

# Workers = cores of CPU
Let’s say you have the following test structure:
tests/
├── login.spec.js         // 2 tests
├── dashboard.spec.js     // 3 tests
├── profile.spec.js       // 2 tests
├── settings.spec.js      // 1 test

You run 
npx playwright test --workers=2

Playwright Assign tests (not files) as evenly as possible

Worker assignment visualization
# ─────────────── Worker 1 ───────────────
| login.spec.js → Test 1
| login.spec.js → Test 2
| dashboard.spec.js → Test 1
|                          |
# ─────────────── Worker 2 ───────────────
| dashboard.spec.js → Test 2
| dashboard.spec.js → Test 3
| profile.spec.js  → Test 1
| profile.spec.js  → Test 2
| settings.spec.js → Test 1

# Session fixture with { scope: 'worker' } runs once per worker, regardless of how many files

If i do setup and storage state method instead to fixtureMethod
What happens of a storageState expires before the test completion ??

# ...devices
The devices list from @playwright/test is for emulating environments (mobile/tablet devices, user agents, viewports). Example:
use: {
  ...devices['Pixel 5'], // Emulates a Pixel 5
}

# fixture storageState will override defineConfig StorageState  
check how to use it in the same docs auth url
https://playwright.dev/docs/auth#basic-shared-account-in-all-tests

# __dirname is undefined in ES6 modules
ReferenceError: __dirname is not defined in ES module scope
Use import.meta.url to derive __dirname

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

# data-testid - getByTestId()
Using getByTestId() (if you define data-testid attributes instead)
await page.getByTestId('submit-button').click();

# Setting up auth
Auth.setup.js 
https://www.saucedemo.com/

# Close the context and browser after storing the storageState - for CLeanup
# wouldnt it affect using the same storageState file ? 
No, closing the context or browser after saving storageState does not affect your ability to reuse that file.
Playwright immediately writes the complete state (cookies, localStorage, etc.) to the file.

Once that file is saved, it's fully independent of the context or browser that generated it.

Closing the context or browser after saving does not alter the file or invalidate it.


// // ✅ Clean up
    // await context.close(); // optional but good
    // await browser.close(); // strongly recommended

    // Don't close page unless you need it absolutely
    await page.close();



You can print the current cookies in your .spec.js to confirm if storage state was reused:
const cookies = await page.context().cookies();
console.log('Cookies in chromium project:', cookies);

## To run package.json scripts
npm run setuptest
npm run test



## Playwright Hooks
for 1.35 beforeEach, beforeAll, afterEach and afterAll there is no title option
stick to 
test.beforeEach(async () => {
  console.log("Before Each Run");
});

instead of  -  
test.beforeEach('Title Name', async () => {
  console.log("Before Each Run");
});

<!-- Test Describe Properties and all methods -->


Checklist
How to retry failed testscases
How to take screenshots
Take Screenshots of failed Test Cases
Testng type
Managing parallel tests
Parallel Tests
Selenium Grid equivalent
https://www.youtube.com/watch?v=gE-IrFV3bPg

Shards with multiple machines
https://playwright.dev/docs/next/test-parallel#shard-tests-between-multiple-machines
https://playwright.dev/docs/selenium-grid
https://playwright.dev/docs/next/test-sharding
https://www.youtube.com/watch?v=PyMpeDttMas

Playwright github actions sharding --
https://www.youtube.com/watch?v=PyMpeDttMas
https://medium.com/@andrewmart.in/automating-playwright-tests-with-github-actions-5f9ba3dc06a7

Locator methods
https://playwright.dev/docs/writing-tests
Aria snapshots - for Accessibility Check
