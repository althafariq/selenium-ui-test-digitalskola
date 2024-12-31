const { Builder } = require('selenium-webdriver');
const LoginPage = require('../component/LoginPage');
const DashboardPage = require('../component/DashboardPage');
const Header = require('../component/Header');
const config = require('../configs/test.config')
const CartPage = require('../component/CartPage');
const assert = require('assert');

describe('User Add to Cart', function() {
  this.timeout(config.timeout);
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser(config.browser).build();

     // login
     const loginPage = new LoginPage(driver);
     await loginPage.navigate();
     await loginPage.login(config.username, config.password);
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

    // Validate cart count in header
    const header = new Header(driver);
    const cartCount = await header.getCartCount();
    assert.strictEqual(cartCount, 1, 'Expected cart count to be 1');
  });

  it('Cart Count show 2 items after adding 2 items', async function() {
    // add another item to cart
    const dashboardPage = new DashboardPage(driver);
    await dashboardPage.addToCart();

    // Validate cart count in header
    const header = new Header(driver);
    const cartCount = await header.getCartCount();
    assert.strictEqual(cartCount, 2, 'Expected cart count to be 2');
  });

  it('After adding an item, button should change to Remove', async function() {
    const dashboardPage = new DashboardPage(driver);
    await dashboardPage.addToCart();

    const removeButton = await dashboardPage.getRemoveButton();
    const buttonText = await removeButton.getText();
    assert.strictEqual(buttonText, 'Remove', 'Expected button text to be Remove');
  });

  // cart validation after successfull adding 3 items
  it('Click remove button will remove an item from cart', async function() {
    const dashboardPage = new DashboardPage(driver);
    await dashboardPage.clickRemoveButton();

    const header = new Header(driver);
    const cartCount = await header.getCartCount();
    assert.strictEqual(cartCount, 2, 'Expected cart count to be 2');
  });

  it('Validate the name of the items in the cart', async function() {
    const header = new Header(driver);
    await header.openCart();

    const cartPage = new CartPage(driver);
    const cartItems = await cartPage.getCartItems();
    // Validate the name of the items in the cart
    assert.strictEqual(cartItems[0].name, 'Sauce Labs Bike Light', 'Expected item name to be Sauce Labs Bike Light');
    assert.strictEqual(cartItems[1].name, 'Sauce Labs Bolt T-Shirt', 'Expected item name to be Sauce Labs Bolt T-Shirt');

    // Validate the price of the items in the cart
    assert.strictEqual(cartItems[0].price, '$9.99', 'Expected item price to be $9.99');
    assert.strictEqual(cartItems[1].price, '$15.99', 'Expected item price to be $15.99');
  });

  after(async function() {
    // wait for 3 seconds
    setTimeout(async () => {
      await driver.quit();
    }, 3000);
  });

});