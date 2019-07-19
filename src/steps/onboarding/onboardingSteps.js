const {Builder, By, Key, promise, until} = require('selenium-webdriver');
const expect = require('chai').expect;
const baseSteps = require(__srcdir + '/steps/baseSteps.js')
const splashPage = require(__srcdir + '/pages/onboarding/splashPage.js')
const initialSetupPage = require(__srcdir + '/pages/onboarding/initialSetupPage.js')
const readyPage = require(__srcdir + '/pages/onboarding/readyPage.js')


class onboardingSteps extends baseSteps {

    constructor(driver){
        super(driver)
        this.splashPage = new splashPage(driver)
        this.initialSetupPage = new initialSetupPage(driver)
    }

    async open(){
        this.spashPage.open()
    }

    async verifyHeadContains(text){

        //Promises 201 - passing promises between methods
        //N.B. getHeadMain returned a Promise wrapping an element
        //let elem = await this.splashPage.getHeadMain()

        //elem get text also returns a promise
        //let val = await elem.getText()

        //console.log("DEBUG val " + val)

        //ERGO
        await this.splashPage.getHeadMain().then(elem => {
            elem.getText().then(eltxt => {
                expect(eltxt)
                    .to
                    .include(text)
            })
        })
    }

    async verifyCreditsLink(){
        await this.splashPage.getCreditsLink().then( elem => {
            elem.getText().then( eltxt => {
                expect(eltxt).to.equal('InfluxData')
            })

            elem.getAttribute('href').then(href => {
                expect(href).to.equal('https://www.influxdata.com/')
            })
        })
    }

    async clickStart(){
        await this.splashPage.getStartButton().then( elem => {
            elem.click()
        })
    }

    async verifySetupHeaderContains(text){
        await this.initialSetupPage.getHeaderMain().then(elem => {
            elem.getText().then( eltxt => {
                expect(eltxt).to.include(text)
            })
        })
    }

    async verifyNavCrumbText(crumb, text){
        await this.initialSetupPage.getCrumbStep(crumb).then( elem => {
            elem.getText().then(eltxt => {
                expect(eltxt).to.include(text)
            })
        })

    }



}

module.exports = onboardingSteps
