import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login', () => {
  test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Check if page is opened
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
});