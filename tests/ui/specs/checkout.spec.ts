import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';



test.describe ('Sorting', () => {
    test('Sorting by price', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        
        // Login
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        
        await productsPage.selectSort('hilo');
        const result = await productsPage.checkSorting('hilo');

        const mostExpensive = result.expected[0];
        const firstOnPage = result.actual[0];
        
        expect(firstOnPage.name).toBe(mostExpensive.name);
        expect(firstOnPage.price).toBe(mostExpensive.price);
    });

    test('Sorting Z-A', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        
        await productsPage.selectSort('za');
        const result = await productsPage.checkSorting('za');
        
        expect(result.actual[0].name).toContain('Test.allTheThings');
    });
});
