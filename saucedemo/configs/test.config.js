require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

module.exports = {
  browser: process.env.BROWSER,
  baseUrl: process.env.BASE_URL,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  timeout: 40000
};