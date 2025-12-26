import { Page, Locator } from '@playwright/test';

export class LoginPage {

  readonly page: Page;
  readonly loginField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');

  }

  // Enter the page
  async open() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Login
  async login(username: string, password: string) {
    await this.loginField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async getError() {
  return await this.errorMessage.textContent();
  }
}
