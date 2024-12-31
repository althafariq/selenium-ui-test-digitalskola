const { By } = require('selenium-webdriver');

class CartPage {
  constructor(driver) {
    this.driver = driver;
    this.titleText = By.className('title');
    this.cartItems = By.className('cart_item');
    this.qtyLabel = By.className('cart_quantity_label');
    this.descriptionLabel = By.className('cart_desc_label');
    this.removeButton = By.xpath("//*[contains(text(), 'Remove')]");
    this.continueShoppingButton = By.id('continue-shopping');
    this.checkoutButton = By.id('checkout');
  }

  async validateOnCart() {
    const title = await this.driver.findElement(this.titleText);
    const qtyLabel = await this.driver.findElement(this.qtyLabel);
    const descriptionLabel = await this.driver.findElement(this.descriptionLabel);
    const continueShoppingButton = await this.driver.findElement(this.continueShoppingButton);
    const checkoutButton = await this.driver.findElement(this.checkoutButton);
    return {
      titleText: await title.getText(),
      qtyLabel: await qtyLabel.getText(),
      descriptionLabel: await descriptionLabel.getText(),
      continueShoppingButton: await continueShoppingButton.isDisplayed(),
      checkoutButton: await checkoutButton.isDisplayed()
    }
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

  async clickContinueShopping() {
    await this.driver.findElement(this.continueShoppingButton).click();
  }

  async clickCheckout() {
    await this.driver.findElement(this.checkoutButton).click();
  }

}

module.exports = CartPage;