const { By } = require('selenium-webdriver');

class CartPage {
  constructor(driver) {
    this.driver = driver;
    this.cartCount = By.className('shopping_cart_badge');
    this.cartButton = By.className('shopping_cart_link');
    this.cartItems = By.className('cart_item');
  }

  async getCartCount() {
    return await this.driver.findElement(this.cartCount).getText();
  }

  async openCart() {
    await this.driver.findElement(this.cartButton).click();
  }

  async getCartItems() {
    let cartItems = await this.driver.findElements(this.cartItems);
    let items = [];
    for (let item of cartItems) {
      let itemName = await item.findElement(By.className('inventory_item_name')).getText();
      items.push(itemName);
    }
    return items;
  }

}

module.exports = CartPage;