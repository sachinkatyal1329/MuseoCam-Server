const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3')
const { IamAuthenticator } = require('ibm-watson/auth')
const fs = require('fs')


require ('custom-env').env('IBM')

const visualRecognition = new VisualRecognitionV3({
    version: '2018-03-19',
    authenticator: new IamAuthenticator({
      apikey: process.env.APIKey,
    }),
    serviceUrl: process.env.URL,
})


async function classifyImage(urlPath) {

    const classifyParams = {
        imagesFile: fs.createReadStream(urlPath),
        threshold: 0.6,
    }

    const response = await visualRecognition.classify(classifyParams).then(response => {
        const classifiedImages = response.result;
        return JSON.stringify(classifiedImages, null, 2)
    }).catch(err => {
        return 'error: ' + err
    })

    return response
}

classifyImage('./images/0.jpg').then(response => {
    console.log(response)
})
