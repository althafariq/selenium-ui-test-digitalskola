const { Builder } = require('selenium-webdriver');
const LoginPage = require('../component/LoginPage');
const CheckoutPage = require('../component/CheckoutPage');
const DashboardPage = require('../component/DashboardPage');
const Header = require('../component/Header');
const CheckoutOverviewPage = require('../component/CheckoutOverview');
const CheckoutCompletedPage = require('../component/CheckoutCompleted');
const CartPage = require('../component/CartPage');
const config = require('../configs/test.config');
const takeScreenshot = require('../utils/screenshot');
const assert = require('assert');

describe('User Proceed Checkout', function() {
  this.timeout(config.timeout);
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser(config.browser).build();

    // login
    const loginPage = new LoginPage(driver);
    await loginPage.navigate();
    await loginPage.login(config.username, config.password);

    // add 2 item to cart
    const dashboardPage = new DashboardPage(driver);
    await dashboardPage.addToCart();
    await dashboardPage.addToCart();

    // open cart in header
    const header = new Header(driver);
    await header.openCart();

    // take screenshot
    await takeScreenshot(driver, '[user proceed checkout] cart page');
    // click checkout button
    const cartPage = new CartPage(driver);
    await cartPage.clickCheckoutButton();
  });

  // beforeEach(async function() {
  //   // wait 0.5 seconds
  //   await new Promise(resolve => setTimeout(resolve, 500));
  // });

  it('Validate landed on pre-checkout page to fill input form', async function() {
    const checkoutPage = new CheckoutPage(driver);
    const checkout = await checkoutPage.validateOnCheckoutPage();
    assert.strictEqual(checkout.titleText, 'Checkout: Your Information', `Expected checkout title to be 'Checkout: Your Information'`);
    assert.strictEqual(checkout.firstNameInput, true, 'Expected first name label to be displayed');
    assert.strictEqual(checkout.lastNameInput, true, 'Expected last name label to be displayed');
    assert.strictEqual(checkout.zipCodeInput, true, 'Expected postal code label to be displayed');
    assert.strictEqual(checkout.continueButton, true, 'Expected continue button to be displayed');
    assert.strictEqual(checkout.cancelButton, true, 'Expected cancel button to be displayed');

    // take screenshot
    await takeScreenshot(driver, '[user proceed checkout] before input checkout form');
  });

  it('Fill in checkout form and click continue', async function() {
    const checkoutPage = new CheckoutPage(driver);
    await checkoutPage.fillCheckoutForm('althaf', 'ariq', '60211');

    // take screenshot
    await takeScreenshot(driver, '[user proceed checkout] after input checkout form');
    await checkoutPage.clickContinueButton();
  });

  it('Validate landed on checkout overview page', async function() {
    const checkoutOverviewPage = new CheckoutOverviewPage(driver);
    const checkoutOverview = await checkoutOverviewPage.validateOnCheckoutOverviewPage();
    assert.strictEqual(checkoutOverview.titleText, 'Checkout: Overview', `Expected checkout title to be 'Checkout: Overview'`);
    assert.strictEqual(checkoutOverview.finishButton, true, 'Expected finish button to be displayed');
    assert.strictEqual(checkoutOverview.cancelButton, true, 'Expected cancel button to be displayed');

    // take screenshot
    await takeScreenshot(driver, '[user proceed checkout] checkout overview page');
  });

  it('Compare cart items and checkout overview items', async function() {
    const checkoutOverviewPage = new CheckoutOverviewPage(driver);
    const cartPage = new CartPage(driver);

    const cartItems = await cartPage.getCartItems();
    const checkoutOverviewItems = await checkoutOverviewPage.checkCartItems();

    // Compare cart items and checkout overview items
    assert.strictEqual(cartItems.length, checkoutOverviewItems.length, 'Expected cart items and checkout overview items to have the same length');
    for (let i = 0; i < cartItems.length; i++) {
      assert.strictEqual(cartItems[i].name, checkoutOverviewItems[i].name, 'Expected cart item name and checkout overview item name to be the same');
      assert.strictEqual(cartItems[i].price, checkoutOverviewItems[i].price, 'Expected cart item price and checkout overview item price to be the same');
    }

    // debugging
    console.log(cartItems);
    console.log(checkoutOverviewItems);
  });

  it('Validate payment information', async function() {
    const checkoutOverviewPage = new CheckoutOverviewPage(driver);
    const paymentInfo = await checkoutOverviewPage.getPaymentDetail();
    assert.strictEqual(paymentInfo.label, 'Payment Information:', 'Expected payment label to be "Payment Information:"');
    assert.strictEqual(paymentInfo.detail, 'SauceCard #31337', 'Expected payment detail to be "SauceCard #31337"');
    console.log(paymentInfo);
  });

  it('Validate shipping information', async function() {
    const checkoutOverviewPage = new CheckoutOverviewPage(driver);
    const shippingInfo = await checkoutOverviewPage.getShippingDetail();
    assert.strictEqual(shippingInfo.label, 'Shipping Information:', 'Expected shipping label to be "Shipping Information:"');
    assert.strictEqual(shippingInfo.detail, 'Free Pony Express Delivery!', 'Expected shipping detail to be "Free Pony Express Delivery!"');
    console.log(shippingInfo);
  });

  it('Validate price information', async function() {
    const checkoutOverviewPage = new CheckoutOverviewPage(driver);
    const priceInfo = await checkoutOverviewPage.getPriceDetail();
    assert.strictEqual(priceInfo.priceTotalLabel, true, 'Expected price total label to be displayed');

    // assert total item price by summing up the price of each item in the cart
    const cartPage = new CartPage(driver);
    const cartItems = await cartPage.getCartItems();
    let totalItemPrice = 0;
    for (let item of cartItems) {
      totalItemPrice += parseFloat(item.price.replace('$', ''));
    }
    assert.strictEqual(priceInfo.totalItem, 'Item total: $' + totalItemPrice.toFixed(2), 'Expected total item price to be the sum of the prices of each item in the cart');

    // assert total tax price by multiplying the total item price by 8%
    const taxPrice = totalItemPrice * 0.08;
    assert.strictEqual(priceInfo.tax, 'Tax: $' + taxPrice.toFixed(2), 'Expected total tax price to be the tax of the total item price');

    // assert total price by adding the total item price and the total tax price
    const totalPrice = totalItemPrice + taxPrice;
    assert.strictEqual(priceInfo.totalCalc, 'Total: $' + totalPrice.toFixed(2), 'Expected total price to be the sum of the total item price and the total tax price');

    // debugging
    console.log(priceInfo);
  });

  it('Click finish button', async function() {
    const checkoutOverviewPage = new CheckoutOverviewPage(driver);
    await checkoutOverviewPage.clickFinishButton();

    const checkoutCompletedPage = new CheckoutCompletedPage(driver);
    const checkoutCompleted = await checkoutCompletedPage.validateOnCheckoutCompletedPage();
    assert.strictEqual(checkoutCompleted.titleText, 'Checkout: Complete!', `Expected checkout title to be 'Checkout: Complete!'`);
    assert.strictEqual(checkoutCompleted.checkoutComplete, true, 'Expected checkout complete message to be displayed');
    assert.strictEqual(checkoutCompleted.backHomeButton, true, 'Expected back home button to be displayed');

    // take screenshot
    await takeScreenshot(driver, '[user proceed checkout] checkout completed page');
  });

  it('cart count on header should be empty after checkout completed', async function() {
    const header = new Header(driver);
    const cartCount = await header.getCartCount();

    // expected cart count to be empty
    assert.strictEqual(cartCount, false, 'Expected cart count to not be displayed');
  });

  it('Click back home button after checkout completed', async function() {
    const checkoutCompletedPage = new CheckoutCompletedPage(driver);
    await checkoutCompletedPage.clickBackHomeButton();

    const dashboardPage = new DashboardPage(driver);
    const dashboard = await dashboardPage.validateOnDashboard();
    assert.strictEqual(dashboard.titleText, 'Products', `Expected dashboard title to be 'Products'`);
  });

  after(async function() {
    // wait for 3 seconds
    setTimeout(async () => {
      await driver.quit();
    }, 3000);
  });

});