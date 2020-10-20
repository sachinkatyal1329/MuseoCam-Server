'user-strict'
require('custom-env').env('process')

const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors({ origin: true}))
app.use(express.json())



const port = process.env.PORT | 5000

app.route('/artifact')
    .post((req, res) => {
        console.log(req.body)
        res.json(req.body)
        console.log("POST REQUEST")
    })
    .put((req, res) => {
        console.log(req.body)
        res.send(req.body)
        console.log("EDIT REQUEST")
    })
    .delete((req, res) => {
        //delete artifact
        console.log('DELETE REQUEST')
        res.send('success')
    })

app.get('/artifact/:id?', (req, res) => {
    res.json({id: req.query.id})
    console.log(req.query.id)
    console.log('GET REQUEST ' + req.query.id)
})


app.listen(port, () => {console.log(`Server running on port ${port}`)})