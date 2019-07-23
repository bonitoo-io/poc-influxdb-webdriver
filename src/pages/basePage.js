const { By, Key, promise, until} = require('selenium-webdriver');

class basePage{

    constructor(driver){
        this.driver = driver;
    }

    delay(timeout){
        return new Promise((resolve) => {
            setTimeout(resolve, timeout)
        })
    }

    async waitUntilElementCss(selector){
        await this.driver.wait(until.elementLocated(By.css(selector)))
    }

    // selectors should be array of {type, selector}
    async isLoaded(selectors, url = undefined){
        if(url){
         //   console.log("DEBUG URL " + url)
            this.driver.wait(until.urlContains(url))
        }
        //console.log("DEBUG timeouts " + JSON.stringify(this.driver.manage().getTimeouts()))
        selectors.forEach(async (selector, driver = this.driver) => {
            if(selector.type === 'css'){
           //     console.log("DEBUG selector " + JSON.stringify(selector))
                await this.driver.wait(until.elementLocated(By.css(selector.selector)))
            }
        })
    }

    /* handled globally
    writeScreenShot(filename){
        this.driver.takeScreenshot().then(async (image, err) => {
            fs.writeFile(filename, image, 'base64', (err) => {
                if(err) {
                    console.log(err)
                }
            })
        })
    }*/

}

module.exports = basePage
