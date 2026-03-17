export class BasePage {
    constructor(page) {
      this.page = page;
    }
  
    async navigateTo(url) {
      await this.page.goto(url);
    }
  
    async click(locator) {
      await this.page.locator(locator).click();
    }
  
    async fill(locator, text) {
      await this.page.locator(locator).fill(text);
    }
  
    async getText(locator) {
      return await this.page.locator(locator).textContent();
    }
  
    async waitForElement(locator) {
      await this.page.locator(locator).waitFor({ state: 'visible' });
    }
  }
  