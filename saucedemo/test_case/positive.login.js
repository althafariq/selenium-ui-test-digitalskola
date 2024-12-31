const { Builder } = require('selenium-webdriver');
const LoginPage = require('../component/LoginPage');
const DashboardPage = require('../component/DashboardPage');
const config = require('../configs/test.config');
const { getDriver } = require('../configs/webDriver.config');
const takeScreenshot  = require('../utils/screenshot');
const assert = require('assert');

describe('User Successful Login', function() {
  this.timeout(config.timeout);
  let driver;

  before(async function() {
    driver = await getDriver(config.browser)
  });

  // Assertion or validation
  it('Should login successfully and validate landed on dashboard', async function() {
    const loginPage = new LoginPage(driver);
    await loginPage.navigate();

    // take screenshot
    await takeScreenshot(driver, '[positive login] before_login');

    await loginPage.login(config.username, config.password);

    const dashboardPage = new DashboardPage(driver);
    const dashboard = await dashboardPage.validateOnDashboard();
    assert.strictEqual(dashboard.titleText, 'Products', 'Expected dashboard title to be Products');
    assert.strictEqual(dashboard.itemsCount, 6, 'Expected items count to be 6');
  });

  after(async function() {
    // take screenshot
    await takeScreenshot(driver, '[positive login] after_login');

    // wait for 3 seconds
    setTimeout(async () => {
      await driver.quit();
    }, 3000);
  });

});