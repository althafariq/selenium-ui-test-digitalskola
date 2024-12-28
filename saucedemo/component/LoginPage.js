const { By } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.usernameInput = By.id('user-name');
    this.passwordInput = By.id('password');
    this.loginButton = By.id('login-button');
    this.errorMessage = By.className('error-message-container');
  }

  async navigate() {
    await this.driver.get('https://www.saucedemo.com');
  }

  async inputUsername(username) {
    const usernameField = await this.driver.findElement(this.usernameInput);
    await usernameField.sendKeys(username);
  }

  async inputPassword(password) {
    const passwordField = await this.driver.findElement(this.passwordInput);
    await passwordField.sendKeys(password);
  }

  async clickLoginButton() {
    const loginButton = await this.driver.findElement(this.loginButton);
    await loginButton.click();
  }

  async login(username, password) {
    await this.inputUsername(username);
    await this.inputPassword(password);
    await this.clickLoginButton();
  }

  async getErrorMessage() {
    try {
      const errorElement = await this.driver.findElement(this.errorMessage);
      return await errorElement.getText();
    }
    catch (error) {
      return null;
    }
  }
}

module.exports = LoginPage;
