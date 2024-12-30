const { Builder } = require('selenium-webdriver');

async function getDriver(browser) {
  const options = {
    chrome: require('selenium-webdriver/chrome'),
    // edge: require('selenium-webdriver/edge'),
    firefox: require('selenium-webdriver/firefox')
  };

  // Setup browser-specific options using switch-case
  let browserOptions;
  switch (browser.toLowerCase()) {
    case 'chrome':
      browserOptions = new options.chrome.Options();
      browserOptions.addArguments('--disable-infobars', '--headless', '--disable-gpu', '--window-size=1920,1080');
      break;

    // case 'edge':
    //   browserOptions = new options.edge.Options();
    //   browserOptions.addArguments('--headless');
    //   break;
    
    case 'firefox':
      browserOptions = new options.firefox.Options();
      browserOptions.addArguments('--headless');
      break;

    default:
      throw new Error(`Unsupported browser: ${browser}`);
  }

  // Build the driver
  const driver = await new Builder()
    .forBrowser(browser)
    .setChromeOptions(browser === 'chrome' ? browserOptions : null) // Applies only for Chrome
    .setFirefoxOptions(browser === 'firefox' ? browserOptions : null) // Applies only for Firefox
    .build();

  return driver;
}

module.exports = {
  getDriver,
};
