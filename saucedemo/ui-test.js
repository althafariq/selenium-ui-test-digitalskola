const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function loginTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.saucedemo.com');

    // Login
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');

    await driver.findElement(By.id('login-button')).click();
    console.log('Login button clicked\n');

    // validate successful login
    let titleText = await driver.findElement(By.xpath('//div[@class="app_logo"]')).getText();
    assert.strictEqual(titleText.includes('Swag Labs'), true, 'Title is not Swag Labs');
    console.log('Title check: PASS');

    let menuButton = await driver.findElement(By.id('react-burger-menu-btn'));
    assert.strictEqual(await menuButton.isDisplayed(), true, 'Menu button is not displayed');
    console.log('Menu button check: PASS');

    let inventoryList = await driver.findElement(By.className('inventory_list'));
    let items = await inventoryList.findElements(By.className('inventory_item'));
    assert.strictEqual(items.length, 6, 'Number of items is not 6');
    console.log('Number of items check: PASS\n');

    // Add to cart
    await items[0].findElement(By.className('btn_primary')).click();
    console.log('Add to cart button clicked');

    // Validate cart count after adding an item
    let cartCount = await driver.findElement(By.className('shopping_cart_badge')).getText();
    assert.strictEqual(cartCount, '1', 'Cart count is not 1');
    console.log('Cart count displayed 1: PASS\n');

    // Add another item to cart
    await items[1].findElement(By.className('btn_primary')).click();
    console.log('Add to cart for another item button clicked');

    // Validate cart count after adding another item
    let cartCount1 = await driver.findElement(By.className('shopping_cart_badge')).getText();
    assert.strictEqual(cartCount1, '2', 'Cart count is not 2');
    console.log('Cart count displayed 2: PASS\n');
  } 
  
  finally {
    console.log('Login Test completed and browser closed after 5 seconds\n\n');
    setTimeout(async () => {
      await driver.quit();
    }, 5000); 
  }
}

loginTest();