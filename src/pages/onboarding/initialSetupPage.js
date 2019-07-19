const basePage = require(__srcdir + '/pages/basePage.js')
const { By, Key, promise, until} = require('selenium-webdriver');

const headerMain = '[data-testid=admin-step--head-main]'
const navCrumbToken = 'data-testid=nav-step--'
const crumbWelcome = '[data-testid=nav-step--welcome]'
const crumbSetup = '[data-testid=nav-step--setup]'


class initialSetupPage extends basePage {

    constructor(driver){
        super(driver)
    }

    async getHeaderMain(){
        return await this.driver.findElement(By.css(headerMain));
    }


    async getCrumbStep(step){
        return await this.driver.findElement(By.css(`[${navCrumbToken}${step}]`));
    }

}

module.exports = initialSetupPage;
