import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {

    readonly products = [
        'sauce-labs-backpack',
        'sauce-labs-bike-light', 
        'sauce-labs-bolt-t-shirt',
        'sauce-labs-fleece-jacket',
        'sauce-labs-onesie',
        'test.allthethings()-t-shirt-(red)'
    ];

readonly page: Page;

readonly shoppingCartIcon: Locator;
readonly burgerMenuButton: Locator;
readonly sortDropdown: Locator;
readonly productNames: Locator;
readonly productPrices: Locator;

 constructor(page: Page) {
    this.page = page;

    this.shoppingCartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.sortDropdown = page.locator('.product_sort_container');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    }

    testProducts = [
        { name: 'Sauce Labs Backpack', price: 29.99 },
        { name: 'Sauce Labs Bike Light', price: 9.99 },
        { name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
        { name: 'Sauce Labs Fleece Jacket', price: 49.99 },
        { name: 'Sauce Labs Onesie', price: 7.99 },
        { name: 'Test.allTheThings() T-Shirt', price: 15.99 }
    ];

    sortProducts(products: any[], type: string) {
        const sorted = [...products];
        
        if (type === 'name-asc') {
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        }
        if (type === 'name-desc') {
            return sorted.sort((a, b) => b.name.localeCompare(a.name));
        }
        if (type === 'price-asc') {
            return sorted.sort((a, b) => a.price - b.price);
        }
        if (type === 'price-desc') {
            return sorted.sort((a, b) => b.price - a.price);
        }
        
        return sorted;
    }

    async selectSort(type: 'az' | 'za' | 'lohi' | 'hilo') {
        const options = {
            'az': 'az',
            'za': 'za', 
            'lohi': 'lohi',
            'hilo': 'hilo'
        };
        await this.sortDropdown.selectOption(options[type]);
    }

    async getProductsFromPage() {
        const names = await this.productNames.allTextContents();
        const prices = await this.productPrices.allTextContents();
        
        return names.map((name, index) => ({
            name,
            price: parseFloat(prices[index].replace('$', ''))
        }));
    }

    async checkSorting(type: 'az' | 'za' | 'lohi' | 'hilo') {
        const sortTypeMap = {
            'az': 'name-asc',
            'za': 'name-desc',
            'lohi': 'price-asc',
            'hilo': 'price-desc'
        };
        
        const expected = this.sortProducts(this.testProducts, sortTypeMap[type]);

        const actual = await this.getProductsFromPage();
        
        for (let i = 0; i < 3; i++) {
            if (expected[i] && actual[i]) {
                console.log(`Expected: ${expected[i].name}, Actual: ${actual[i].name}`);
            }
        }
        
        return { expected, actual };
    }

    async openMenu(): Promise<void> {
            await this.burgerMenuButton.click();
        }

    async openCart(): Promise<void> {
        await this.shoppingCartIcon.click();
        await this.page.waitForURL(/cart.html/);
        await this.page.waitForTimeout(1000);
        }
    
    async addProductToCart() {
        const randomProduct = this.products[Math.floor(Math.random() * this.products.length)];
        const addButton = this.page.locator(`[data-test="add-to-cart-${randomProduct}"]`);
        await addButton.click();
        const removeButton = this.page.locator(`[data-test="remove-${randomProduct}"]`);
        await expect(removeButton).toBeVisible();
    }
    }