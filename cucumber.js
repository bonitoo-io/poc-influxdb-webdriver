const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, promise, until} = require('selenium-webdriver');
//following provides cleaner paths in require statements
global.__basedir = __dirname
global.__srcdir = __dirname + "/src"

const { flush, config, defaultUser } = require(__srcdir + '/utils/InfluxUtils');

var common = '--require "src/step_definitions/**/*.js" --require-module babel-core/register ';

global.__config = config
global.__defaultUser = defaultUser

if(__config.headless) {
    global.__wdriver = new Builder()
        .forBrowser(__config.browser)
        .setChromeOptions(new chrome.Options().headless().windowSize({width: 1024, height: 768}))
        .build()
}else{
    global.__wdriver = new Builder()
        .forBrowser(__config.browser)
        .build()
}

module.exports = {
    'default': common + '--format summary --format json:report/cucumber_report.json',
    dry: common + '--dry-run',
    progress: common + '--format progress'
};
