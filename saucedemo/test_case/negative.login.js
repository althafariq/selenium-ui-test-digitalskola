const { Builder } = require('selenium-webdriver');
const LoginPage = require('../component/LoginPage');
const config = require('../configs/test.config');
const { getDriver } = require('../configs/webDriver.config');
const takeScreenshot  = require('../utils/screenshot');
const assert = require('assert');

describe('User Login Failed', function() {
  this.timeout(config.timeout);
  let driver;

  before(async function() {
    driver = await getDriver(config.browser);
  });

  // test suite before each test case
  beforeEach(async function() {
    const loginPage = new LoginPage(driver);
    await loginPage.navigate();

    // take screenshot
    await takeScreenshot(driver, '[negative login] before login');
    await loginPage.login('invalidusername', 'secrinvalidpasswordet_sauce');
  });

  // Assertion or validation
  it('Should not login successfully and verify error message', async function() {
    const loginPage = new LoginPage(driver);
    const errorMessage = await loginPage.getErrorMessage();
    assert.strictEqual(errorMessage, 'Epic sadface: Username and password do not match any user in this service');
  });

  after(async function() {
    // take screenshot
    await takeScreenshot(driver, '[negative login] after login');
    
    // wait for 3 seconds
    setTimeout(async () => {
      await driver.quit();
    }, 3000);
  });

});