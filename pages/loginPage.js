import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = '#loginBtn';
    this.errorMessage = '.error';
  }

  async login(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }
}
