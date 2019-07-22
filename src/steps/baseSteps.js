const fs = require('fs')

class baseSteps{
    constructor(driver){
        this.driver = driver
    }

    delay(timeout){
        return new Promise((resolve) => {
            setTimeout(resolve, timeout)
        })
    }

    writeScreenShot(filename){
        this.driver.takeScreenshot().then(async (image, err) => {
            fs.writeFile(filename, image, 'base64', (err) => {
                if(err) {
                    console.log(err)
                }
            })
        })
    }

    async open(url){
        await this.driver.get(url)
    }

    async openBase(){
        await this.driver.get( `${__config.protocol}://${__config.host}:${__config.port}/`)
        await this.driver.wait(function(driver = this.driver) {
            return driver.executeScript('return document.readyState').then(function(readyState) {
                return readyState === 'complete';
            });
        });

    }

    async waitForPageLoad(){
        await this.driver.wait(function(driver = this.driver) {
            return driver.executeScript('return document.readyState').then(function(readyState) {
                return readyState === 'complete';
            });
        });
    }
}

module.exports = baseSteps
