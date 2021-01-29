const express = require('express')
const bodyParser = require('body-parser')
const server = express().use(bodyParser.json())


const config = require("./package.json").config

const chat = require('./services/chatService')

const port = process.env.PORT || config.port


server.get('/webhook', (req, res) => {
    let VERIFY_TOKEN = config.vertifyToken
    
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    if (mode && token) {
    
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {

        res.sendStatus(403);      
      }
    } else {
        res.sendStatus(403)
    }
})

server.post('/webhook', (req, res) => {
    let body = req.body
    
    let recipient = body.entry[0].messaging[0].sender.id
    console.log(recipient)
    console.log(recipient)
    console.log('webhook recive')
    chat.sendMessage(recipient, 'test')
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