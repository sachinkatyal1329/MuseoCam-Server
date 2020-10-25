'use-strict'
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


let tasks = []

cron.schedule('* * * * *', () => {
    console.log("running task every minute")
    let description = undefined
    let id = undefined

    for (const task of tasks) {
        switch (task['task']) {
            case 'post':
                console.log(task)
                 description = task['description']
                 id = task['id']

                db.collection('artifacts').doc(id).set({
                    description
                }).then(() => {
                    console.log("Uploaded artifact")
                })
                break;
            case 'put':
                 description = task['description']
                 id = task['id']

                db.collection('artifacts').doc(id).set({
                    description
                }).then(() => {
                    console.log("EDited documents")
                })

                break;
            case 'delete':
                db.collection('artifacts').doc(task['id']).delete().then(() => {
                    console.log("Document deleted: " + task['id'])
                })
                break;
        }
    }

    tasks = []
})

app.route('/artifact')
    .post((req, res) => {
        console.log(req.body)
        res.json(req.body)
        console.log("HIJADSKDJSAL" + JSON.stringify(req.body['objId']))

        tasks.push({
            task: "post",
            id: req.body['objId'],
            description: req.body['description']
        })

        console.log("POST REQUEST")

    })
    .put((req, res) => {
        tasks.push({
            task: "put",
            id: req.body.objId,
            description: req.body.description
        })
        res.send(req.body)
        console.log("EDIT REQUEST")
    })

app.get('/artifact/:id?', (req, res) => {
    res.json({id: req.query.id})
    console.log(req.query.id)
    console.log('GET REQUEST ' + req.query.id)
})

app.delete('/artifact/:id?', (req, res) => {
    tasks.push({
        task: "delete",
        id: req.query.id
    })
    res.send(req.query.id)
    console.log("DELETE REQUEST")
})



// app.delete('/artifact/:id?', (req, res) => {
//     res.json({id: req.query.id})
//     console.log(req.query.id)
//     console.log("DELETE REQUEST")
// })


app.listen(port, () => {console.log(`Server running on port ${port}`)})