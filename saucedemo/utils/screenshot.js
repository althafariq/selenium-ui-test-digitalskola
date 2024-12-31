const fs = require('fs');
const path = require('path');

/**
 * Takes a screenshot and saves it to the 'screenshots' folder.
 * If the file name already exists, the new screenshot will overwrite it.
 * 
 * @param {WebDriver} driver - The Selenium WebDriver instance.
 * @param {string} fileName - The desired name for the screenshot file.
 */
const takeScreenshot = async (driver, fileName) => {
    try {
        // Folder untuk menyimpan screenshot
        const screenshotsDir = path.resolve(__dirname, '../screenshots');

        // Pastikan folder 'screenshots' ada, jika tidak buat foldernya
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir, { recursive: true });
        }

        // Full path untuk file screenshot
        const filePath = path.resolve(screenshotsDir, `${fileName}.png`);

        // Ambil screenshot dan simpan
        const screenshot = await driver.takeScreenshot();
        fs.writeFileSync(filePath, screenshot, 'base64');

        console.log(`Screenshot saved at: ${filePath}`);
    } catch (error) {
        console.error('Failed to take screenshot:', error);
    }
};

module.exports = takeScreenshot;
