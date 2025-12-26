import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login procedure', () => {
  test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Check if page is opened
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    await loginPage.login('standard_user', 'wrong_password');
    
    // Get an error message
    const error = await loginPage.getError();
    expect(error).toContain('Username and password do not match');
  });

  test('Locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    const error = await loginPage.getError();
    expect(error).toContain('Sorry, this user has been locked out');
  });

});