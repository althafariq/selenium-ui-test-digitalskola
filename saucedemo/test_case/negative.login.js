const { Builder } = require('selenium-webdriver');
const LoginPage = require('../component/LoginPage');
const assert = require('assert');

describe('User Login Failed', function() {
  this.timeout(40000);
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  // test suite before each test case
  beforeEach(async function() {
    const loginPage = new LoginPage(driver);
    await loginPage.navigate();
    await loginPage.login('invalidusername', 'secrinvalidpasswordet_sauce');
  });

  // Assertion or validation
  it('Should not login successfully and verify error message', async function() {
    const loginPage = new LoginPage(driver);
    const errorMessage = await loginPage.getErrorMessage();
    assert.strictEqual(errorMessage, 'Epic sadface: Username and password do not match any user in this service');
  });

  after(async function() {
    // wait for 3 seconds
    setTimeout(async () => {
      await driver.quit();
    }, 3000);
  });

});