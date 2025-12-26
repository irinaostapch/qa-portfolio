import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CartPage {

readonly page: Page;
readonly cartItems: Locator;
readonly cartItemNames: Locator;
readonly cartItemPrices: Locator;
readonly checkoutButton: Locator;
readonly continueShoppingButton: Locator;
readonly removeButton: Locator;
readonly checkoutFirstName: Locator;
readonly checkoutLastName: Locator;
readonly checkoutZipCode: Locator;
readonly continueCheckoutButton: Locator;
readonly finishCheckoutButton: Locator;
readonly checkoutCompleteContainer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.cartItemPrices = page.locator('.inventory_item_price');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.removeButton = page.locator('button:has-text("Remove")');
    this.checkoutFirstName = page.locator('[data-test="firstName"]');
    this.checkoutLastName = page.locator('[data-test="lastName"]');
    this.checkoutZipCode = page.locator('[data-test="postalCode"]');
    this.continueCheckoutButton = page.locator('[data-test="continue"]');
    this.finishCheckoutButton = page.locator('[data-test="finish"]');
    this.checkoutCompleteContainer = page.locator('[data-test="checkout-complete-container"]');
  }

  // Enter the page
    async navigate() {
        await this.page.goto('/cart.html');
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
        
    async createOrder() {  
        await this.checkoutFirstName.fill(faker.person.firstName());
        await this.checkoutLastName.fill(faker.person.lastName());
        await this.checkoutZipCode.fill(faker.location.zipCode());
        await this.continueCheckoutButton.click();
        await this.finishCheckoutButton.click();
        await expect(this.checkoutCompleteContainer).toBeVisible();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

// async clearCart() {
//         const count = await this.getItemCount();
//         for (let i = 0; i < count; i++) {
//             await this.removeItemByIndex(0); 
//         }
//     }
}