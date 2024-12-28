const { Builder } = require('selenium-webdriver');
const LoginPage = require('../component/LoginPage');
const DashboardPage = require('../component/DashboardPage');
const assert = require('assert');

describe('User Successful Login', function() {
  this.timeout(40000);
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  // Assertion or validation
  it('Should login successfully and validate landed on dashboard', async function() {
    const loginPage = new LoginPage(driver);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    const dashboardPage = new DashboardPage(driver);
    const dashboard = await dashboardPage.validateOnDashboard();
    assert.strictEqual(dashboard.titleText, 'Products', 'Expected dashboard title to be Products');
    assert.strictEqual(dashboard.menuButton, true, 'Expected menu button to be displayed');
    assert.strictEqual(dashboard.itemsCount, 6, 'Expected items count to be 6');
  });

  after(async function() {
    // wait for 5 seconds
    setTimeout(async () => {
      await driver.quit();
    }, 5000);
  });

});