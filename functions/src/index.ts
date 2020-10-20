import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as express from 'express'
import * as cors from 'cors'

const firebaseConfig = {
    authDomain: "pennmuseumtest.firebaseapp.com",
    apiKey: "AIzaSyCSOcIEV7IgvCf-tfUIKRuz4yVOLnhE1co",
    databaseURL: "https://pennmuseumtest.firebaseio.com",
    projectId: "pennmuseumtest",
    storageBucket: "pennmuseumtest.appspot.com",
    messagingSenderId: "304449704558",
    appId: "1:304449704558:web:4c741275b63ab468964c7f",
    measurementId: "G-9EGZZT85WW"
};
admin.initializeApp(firebaseConfig)


const app = express()
app.use(cors({ origin: true}))


app.get('/', (req, res) => {
    res.write('hello, world')
})

