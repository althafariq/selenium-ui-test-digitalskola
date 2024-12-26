const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function loginTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.saucedemo.com');

    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce', Key.RETURN);

    await driver.wait(until.elementLocated(By.className('inventory_list')), 1000);

    let title = await driver.getTitle();
    assert.strictEqual(title, 'Swag Labs');

    console.log('Test passed');
  } finally {
    // await driver.quit();
    console.log('Test completed');
  }
}

loginTest();