const express = require('express')
require('custom-env').env('process')

const app = express()

const port = process.env.PORT | 3000

app.get('/', (req, res) => {
    res.send("Hello, Word")
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})


