const fs = require('fs')
var {Before, BeforeAll, After, AfterAll, Status} = require('cucumber')

async function delay(timeout){
    return new Promise((resolve) => {
        setTimeout(resolve, timeout)
    })
}



    Before(function (scenario, callback) {
//        console.log('Calling before hook ' + JSON.stringify(scenario))
        global.scenarioDetails = function(){
            return scenario;
        }
        callback();
    });


    BeforeAll(async function (scenario, callback) {
  //      console.log('Calling beforeAll hook ' + await scenario)
        global.scenarioDetails = function(){
            return scenario;
        }
        //callback();
    })


async function writeScreenShot(filename) {
    __wdriver.takeScreenshot().then(async (image, err) => {
        fs.writeFile(filename, image, 'base64', (err) => {
            if (err) {
                console.log(err)
            }
        })
    })
}

After(function (scenario ,  callback  ) {
    // console.log('Calling After hook' + JSON.stringify(scenario))

    if(!fs.existsSync(`./${__config.screenshot_dir}`)){
        fs.mkdir(`./${__config.screenshot_dir}`, () => {})
    }

    let uri = scenario.sourceLocation.uri
    let feature = uri.substring(uri.lastIndexOf("/") + 1).replace('.','-')
    let name = scenario.pickle.name.trim().replace(' ', '_')
    let now = new Date()
    let nowStr = now.getFullYear().toString() +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        now.getDate().toString().padStart(2, '0') + "-" +
        now.getHours().toString().padStart(2, '0') +
        now.getMinutes().toString().padStart(2, '0') +
        now.getSeconds().toString().padStart(2, '0')
    let filebase = __config.screenshot_dir + '/' + feature + "-" + nowStr + "-" + name


    delay(0).then(async () => {
        if(scenario.result.status === Status.FAILED){
            await writeScreenShot(filebase + "-ERR" + ".png")
        }else {
            await writeScreenShot(filebase + "--OK" + ".png")
        }
        callback()
    })

});

AfterAll(function ( callback ) {
  //  console.log('Calling AfterAll hook ' )
    //global.scenarioDetails = function(){
    //    return scenario;
    //}
    /*
    if(testCase.result.status === Status.FAILED){
        await ds.writeScreenShot("ErrorScreenshot" + count++ + ".png")
    }else {
        await ds.writeScreenShot("TestScreenshot" + count++ + ".png")
    }*/

    callback();
});



