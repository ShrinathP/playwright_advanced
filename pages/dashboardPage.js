import { BasePage } from './basePage.js';

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = '.dashboard-title';
    this.profileBtn = '#profileDropdown';
  }

  async getDashboardTitle() {
    return await this.getText(this.header);
  }

  async openProfileMenu() {
    await this.click(this.profileBtn);
  }
}
