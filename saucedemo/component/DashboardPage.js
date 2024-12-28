const { By } = require('selenium-webdriver');

class DashboardPage {
  constructor(driver) {
    this.driver = driver;
    this.titleText = By.className('title');
    this.menuButton = By.id('react-burger-menu-btn');
    this.inventoryList = By.className('inventory_list');
    this.items = By.className('inventory_item');
    this.cartButton = By.className('shopping_cart_link');
    this.addToCartButton = By.xpath("//*[contains(text(), 'Add to cart')]");
    this.removeButton = By.xpath("//*[contains(text(), 'Remove')]");
    this.cartCount = By.className('shopping_cart_badge');
  }

  async validateOnDashboard() {
    const title = await this.driver.findElement(this.titleText);
    const menuButton = await this.driver.findElement(this.menuButton);
    const inventoryList = await this.driver.findElement(this.inventoryList);
    const items = await inventoryList.findElements(this.items);
    return {
      titleText: await title.getText(),
      menuButton: await menuButton.isDisplayed(),
      itemsCount: items.length
    };
  }

  async addToCart() {
    await this.driver.findElement(this.addToCartButton).click();;
  }

  async getRemoveButton() {
    return await this.driver.findElement(this.removeButton);
  }

  async openCart() {
    await this.driver.findElement(this.cartButton).click();
  }
}

module.exports = DashboardPage;