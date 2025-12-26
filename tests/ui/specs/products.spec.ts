import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';


test.describe ('Sorting products', () => {
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

test.describe('Shopping', () => {
    test('Add products to the cart', async ({page}) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

        // Login
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory.html/);

        // Add random product
        await productsPage.addProductToCart();
        
        // Open cart
        await productsPage.openCart();
    });

    test('Burger menu', async ({page}) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory.html/);
        await productsPage.openMenu();
    });
});

test.describe('Checkout', () => {
    test('Continue shopping', async ({page}) => {
    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory.html/);
        await cartPage.navigate();
        await cartPage.continueShopping();
        await expect(page).toHaveURL(/inventory.html/);
    });
    
    test('Complete order', async ({page}) => {
    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory.html/);
        await cartPage.navigate();
        await cartPage.proceedToCheckout();
        await cartPage.createOrder();
    });
});