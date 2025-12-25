import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Enter the page
  async open() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Login
  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async getError() {
  return await this.page.textContent('[data-test="error"]');
  }
}