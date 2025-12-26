import { Page, Locator } from '@playwright/test';

export class CartPage {

readonly page: Page;
readonly cartItems: Locator;
readonly cartItemNames: Locator;
readonly cartItemPrices: Locator;
readonly checkoutButton: Locator;
readonly continueShoppingButton: Locator;
readonly removeButtons: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.cartItemPrices = page.locator('.inventory_item_price');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.removeButtons = page.locator('button:has-text("Remove")');

  }

  // Enter the page
  async navigate() {
    await this.page.goto('/cart.html');
  }

  
}