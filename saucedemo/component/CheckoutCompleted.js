const { By } = require('selenium-webdriver');

class CheckoutCompletedPage {
  constructor(driver) {
    this.driver = driver;
    this.title = By.className('title');
    this.checkoutComplete = By.className('complete-header');
    this.backHomeButton = By.id('back-to-products');
  }

  async validateOnCheckoutCompletedPage() {
    const title = await this.driver.findElement(this.title);
    const checkoutComplete = await this.driver.findElement(this.checkoutComplete);
    const backHomeButton = await this.driver.findElement(this.backHomeButton);
    return {
      titleText: await title.getText(),
      checkoutComplete: await checkoutComplete.isDisplayed(),
      backHomeButton: await backHomeButton.isDisplayed()
    };
  }

  async clickBackHomeButton() {
    const backHomeButton = await this.driver.findElement(this.backHomeButton);
    await backHomeButton.click();
  }
}

module.exports = CheckoutCompletedPage;