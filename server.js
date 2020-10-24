'user-strict'
require('custom-env').env('process')

const express = require('express')
const cors = require('cors')
const cron = require('node-cron')

const admin = require('firebase-admin')
const serviceAccount = require('./key.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "pennmuseumtest.appspot.com"
})
const db = admin.firestore()

const app = express()
const port = process.env.PORT
app.use(cors({ origin: true}))
app.use(express.json())

cron.schedule('* * * * *', () => {
    console.log("running task every minute")
})

app.route('/artifact')
    .post((req, res) => {
        console.log(req.body)
        res.json(req.body)
        const description = req.body['description']
        const id = req.body['objID']

        db.collection('artifacts').doc(id).set({
            description
        }).then(() => {
            console.log("successfully uploaded info")
        }).catch(err => {
            console.log("Error uploading info : " + err)
        })

        console.log("POST REQUEST")

    })
    .put((req, res) => {
        const description = req.body['description']
        const id = req.body['objId']

        db.collection('artifacts').doc(id).set({
            description
        }).then(() => {
            console.log("EDited documents")
        })

        console.log(req.body)
        res.send(req.body)
        console.log("EDIT REQUEST")
    })

app.get('/artifact/:id?', (req, res) => {
    res.json({id: req.query.id})
    console.log(req.query.id)
    console.log('GET REQUEST ' + req.query.id)
})

app.delete('/artifact/:id?', (req, res) => {
    db.collection('artifacts').doc(req.query.id).delete().then(() => {
        console.log("Document deleted")
    })
    console.log(req.query.id)
    res.send(req.query.id)
    console.log("DELETE REQUEST")
})



// app.delete('/artifact/:id?', (req, res) => {
//     res.json({id: req.query.id})
//     console.log(req.query.id)
//     console.log("DELETE REQUEST")
// })


app.listen(port, () => {console.log(`Server running on port ${port}`)})