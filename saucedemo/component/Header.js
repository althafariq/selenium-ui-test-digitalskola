const { By } = require('selenium-webdriver');

class Header{
  constructor(driver) {
    this.driver = driver;
    this.appLogo = By.className('app_logo');
    this.menuButton = By.id('react-burger-menu-btn');
    this.cartCount = By.className('shopping_cart_badge');
    this.cartButton = By.className('shopping_cart_link');
  }

  async validateHeader() {
    const appLogo = await this.driver.findElement(this.appLogo);
    const menuButton = await this.driver.findElement(this.menuButton);
    const cartButton = await this.driver.findElement(this.cartButton);
    return {
      appLogo: await appLogo.isDisplayed(),
      menuButton: await menuButton.isDisplayed(),
      cartButton: await cartButton.isDisplayed()
    }
  }

  async getCartCount() {
    try {
        const cartBadgeElement = await this.driver.findElement(this.cartCount);
        const cartText = await cartBadgeElement.getText();

        return cartText.trim() === '' ? false : parseInt(cartText, 10);
    } catch (error) {
        if (error.name === 'NoSuchElementError') {
            return false;
        }
        throw error;
    }
}

  async openCart() {
    await this.driver.findElement(this.cartButton).click();
  }
}

module.exports = Header;