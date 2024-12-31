const { By } = require('selenium-webdriver');

class CheckoutPage {
  constructor(driver) {
    this.driver = driver;
    this.title = By.className('title');
    this.continueButton = By.id('continue');
    this.cancelButton = By.id('cancel');
    this.firstNameInput = By.id('first-name');
    this.lastNameInput = By.id('last-name');
    this.zipCodeInput = By.id('postal-code');
    this.errorMessage = By.className('error-message-container');
  }

  async validateOnCheckout() {
    const title = await this.driver.findElement(this.title);
    const firstNameInput = await this.driver.findElement(this.firstNameInput);
    const lastNameInput = await this.driver.findElement(this.lastNameInput);
    const zipCodeInput = await this.driver.findElement(this.zipCodeInput);
    const continueButton = await this.driver.findElement(this.continueButton);
    const cancelButton = await this.driver.findElement(this.cancelButton);
    return {
      titleText: await title.getText(),
      firstNameInput: await firstNameInput.isDisplayed(),
      lastNameInput: await lastNameInput.isDisplayed(),
      zipCodeInput: await zipCodeInput.isDisplayed(),
      continueButton: await continueButton.isDisplayed(),
      cancelButton: await cancelButton.isDisplayed()
    };
  }

  async inputFirstName(firstName) {
    const firstNameField = await this.driver.findElement(this.firstNameInput);
    await firstNameField.sendKeys(firstName);
  }

  async inputLastName(lastName) {
    const lastNameField = await this.driver.findElement(this.lastNameInput);
    await lastNameField.sendKeys(lastName);
  }

  async inputZipCode(zipCode) {
    const zipCodeField = await this.driver.findElement(this.zipCodeInput);
    await zipCodeField.sendKeys(zipCode);
  }

  async clickContinueButton() {
    const continueButton = await this.driver.findElement(this.continueButton);
    await continueButton.click();
  }

  async fillInputForm(firstname, lastname, zipcode) {
    await this.inputFirstName(firstname);
    await this.inputLastName(lastname);
    await this.inputZipCode(zipcode);
    await this.clickContinueButton();
  }

  async clickCancelButton() {
    const cancelButton = await this.driver.findElement(this.cancelButton);
    await cancelButton.click();
  }
}