const express = require('express')
const server = express()

const config = require("./package.json").config

const webhook = require('./services/webhookService').webhookHandle


const port = process.env.PORT || config.port

server.get('/webhook', (req, res) => {
    webhook()
    res.end()
})

server.get('/', (req, res) => {
    res.send({
        status: 200, message: '.....'
    })
})

server.listen(port, () => {
    console.log(config.serverRunningMessage)
})