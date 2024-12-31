const { By } = require('selenium-webdriver');

class CheckoutOverviewPage {
  constructor(driver) {
    this.driver = driver;
    this.title = By.className('title');
    this.finishButton = By.id('finish');
    this.cancelButton = By.id('cancel');
    this.cartItems = By.className('cart_item');
  }

  async validateOnCheckoutOverviewPage() {
    const title = await this.driver.findElement(this.title);
    const finishButton = await this.driver.findElement(this.finishButton);
    const cancelButton = await this.driver.findElement(this.cancelButton);
    return {
      titleText: await title.getText(),
      finishButton: await finishButton.isDisplayed(),
      cancelButton: await cancelButton.isDisplayed()
    }
  }

  async checkCartItems() {
    const cartItems = await this.driver.findElements(this.cartItems);
    let items = [];
    for (let item of cartItems) {
      let itemName = await item.findElement(By.className('inventory_item_name')).getText();
      let itemPrice = await item.findElement(By.className('inventory_item_price')).getText();
      items.push({ name: itemName, price: itemPrice });
    }
    return items;
  }

  async clickFinishButton() {
    const finishButton = await this.driver.findElement(this.finishButton);
    await finishButton.click();
  }


  async clickCancelButton() {
    const cancelButton = await this.driver.findElement(this.cancelButton);
    await cancelButton.click();
  }

  async getPaymentDetail() {
    const paymentLabel = await this.driver.findElement(By.xpath("//div[.='Payment Information:']"));
    const paymentDetail = await this.driver.findElement(By.xpath("//div[@data-test='payment-info-value']"));
    return { 
      label: await paymentLabel.getText(), 
      detail: await paymentDetail.getText() 
    };
  }

  async getShippingDetail() {
    const shippingLabel = await this.driver.findElement(By.xpath("//div[.='Shipping Information:']"));
    const shippingDetail = await this.driver.findElement(By.xpath("//div[@data-test='shipping-info-value']"));
    return { 
      label: await shippingLabel.getText(), 
      detail: await shippingDetail.getText() 
    };
  }

  async getPriceDetail() {
    const priceTotalLabel = await this.driver.findElement(By.xpath("//div[.='Price Total']"));
    const totalItem = await this.driver.findElement(By.xpath("//div[@class='summary_subtotal_label']"));
    const tax = await this.driver.findElement(By.xpath("//div[@class='summary_tax_label']"));
    const totalCalc = await this.driver.findElement(By.xpath("//div[@class='summary_total_label']"));

    return {
      priceTotalLabel: await priceTotalLabel.isDisplayed(),
      totalItem: await totalItem.getText(),
      tax: await tax.getText(),
      totalCalc: await totalCalc.getText()
    }
  }
}

module.exports = CheckoutOverviewPage;