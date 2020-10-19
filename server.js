'user-strict'
require('custom-env').env('process')

const express = require('express')
const cors = require('cors')
const functions = require('firebase-functions')

const app = express()
app.use(cors({ origin: true}))



const port = process.env.PORT | 3000

app.get('/', (req, res) => {
    res.send("Hello, Word")
})

// app.listen(port, () => {
//     console.log(`listening on port ${port}`)
// })


