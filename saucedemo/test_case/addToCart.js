const { Builder } = require('selenium-webdriver');
const LoginPage = require('../component/LoginPage');
const DashboardPage = require('../component/DashboardPage');
const CartPage = require('../component/CartPage');
const assert = require('assert');

describe('User Add to Cart', function() {
  this.timeout(40000);
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();

     // login
     const loginPage = new LoginPage(driver);
     await loginPage.navigate();
     await loginPage.login('standard_user', 'secret_sauce');
  });

  beforeEach(async function() {
    // wait 0.5 seconds
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  // Assertion or validation
  it('Should add 1 item to cart successfully', async function() {
    // add item to cart
    const dashboardPage = new DashboardPage(driver);
    await dashboardPage.addToCart();

    // Validate cart count
    const cartPage = new CartPage(driver);
    const cartCount = await cartPage.getCartCount();
    assert.strictEqual(cartCount, '1', 'Expected cart count to be 1');
  });

  it('Cart Count show 2 items after adding 2 items', async function() {
    // add another item to cart
    const dashboardPage = new DashboardPage(driver);
    await dashboardPage.addToCart();

    // Validate cart count
    const cartPage = new CartPage(driver);
    const cartCount = await cartPage.getCartCount();
    assert.strictEqual(cartCount, '2', 'Expected cart count to be 2');
  });

  it('After adding an item, button should change to Remove', async function() {
    const dashboardPage = new DashboardPage(driver);
    await dashboardPage.addToCart();

    const removeButton = await dashboardPage.getRemoveButton();
    const buttonText = await removeButton.getText();
    assert.strictEqual(buttonText, 'Remove', 'Expected button text to be Remove');
  });

  // cart validation after successfull adding 3 items
  it('Cart count icon show 3 and cart should contain 3 items', async function() {
    const cartPage = new CartPage(driver);
    assert.strictEqual(await cartPage.getCartCount(), '3', 'Expected cart count to be 3');
    await cartPage.openCart();

    const cartItems = await cartPage.getCartItems();
    assert.strictEqual(cartItems.length, 3, 'Expected cart items to be 3');
  });

  it('Validate the name of the items in the cart', async function() {
    const cartPage = new CartPage(driver);
    const cartItems = await cartPage.getCartItems();
    assert.strictEqual(cartItems[0], 'Sauce Labs Backpack', 'Expected item name to be Sauce Labs Backpack');
    assert.strictEqual(cartItems[1], 'Sauce Labs Bike Light', 'Expected item name to be Sauce Labs Bike Light');
    assert.strictEqual(cartItems[2], 'Sauce Labs Bolt T-Shirt', 'Expected item name to be Sauce Labs Bolt T-Shirt');
  });

  after(async function() {
    // wait for 3 seconds
    setTimeout(async () => {
      await driver.quit();
    }, 3000);
  });

});