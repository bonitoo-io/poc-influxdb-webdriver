const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, promise, until} = require('selenium-webdriver');
import { After, AfterAll, Before, BeforeAll, Given, Status, Then, When } from 'cucumber';
import { flush, config, defaultUser } from '../../utils/InfluxUtils';

const expect = require('chai').expect;
const onboardingSteps = require(__srcdir + '/steps/onboarding/onboardingSteps.js')

/*
let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless().windowSize({ width: 1024, height: 768}))
    .build()
*/

let driver = __wdriver
let onbSteps = new onboardingSteps(driver)


const delay = function(timeout){
    return new Promise((resolve) => {
        setTimeout(resolve, timeout)
    })
}


Given(/^I open the Influx onboarding page$/, async () => {

    //await driver.get("http://" + __config.host + ":" + __config.port + "/" )
    await onbSteps.openBase()

    await onbSteps.delay(3000)
    //return 'pending';

})

Then(/^there is a Welcome message$/, async () => {

    /*
    expect(await driver.findElement(By.css('[data-testid=init-step--head-main]'))
        .getText())
        .to
        .include('Welcome') */
    await onbSteps.verifyHeadContains('Welcome')
    //return 'pending';

})

Then(/^there is a link to corporate$/, async () => {

    /*
    expect(await driver.findElement(By.css('[data-testid=credits] a')).getText())
        .to
        .equal('InfluxData')

    expect(await driver.findElement(By.css('[data-testid=credits] a')).getAttribute('href'))
        .to
        .equal('https://www.influxdata.com/')
    */
    await onbSteps.verifyCreditsLink()

})

When(/^I click on Get Started$/, async () => {

    //await driver.findElement(By.css('[data-testid=onboarding-get-started]')).click()
    //return 'pending';
    await onbSteps.clickStart();
    await onbSteps.delay(3000)

})

Then(/^the Initial Setup Page is loaded$/, async () => {
    /*
    expect(await driver.findElement(By.css('[data-testid=admin-step--head-main]')).getText())
        .to
        .include('Setup')

    expect(await driver.findElement(By.css('[data-testid=nav-step--welcome]')).getText())
        .to
        .equal('Welcome')

    expect(await driver.findElement(By.css('[data-testid=nav-step--setup]')).getText())
        .to
        .include('Setup') */
    await onbSteps.verifySetupHeaderContains('Setup')
    await onbSteps.verifyNavCrumbText('welcome', 'Welcome')
    await onbSteps.verifyNavCrumbText('setup', 'Setup')
    //return 'pending';

})

AfterAll(async() => {
    await driver.close()
})

