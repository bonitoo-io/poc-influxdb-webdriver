
class basePage{

    constructor(driver){
        this.driver = driver;
    }

    delay(timeout){
        return new Promise((resolve) => {
            setTimeout(resolve, timeout)
        })
    }

}

module.exports = basePage
