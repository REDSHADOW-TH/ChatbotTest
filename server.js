const version = require('./package.json').version
const express = require('express')
const bodyParser = require('body-parser')
const server = express().use(bodyParser.json())


const config = require("./package.json").config

const chat = require('./services/chatService')

const port = process.env.PORT || config.port

const keyword = require('./data/keyword').keyword

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

    let message = getMessage(body.entry[0].messaging[0].message.text)

    console.log(body)

    chat.sendMessage(recipient, message)
    res.end()
})

server.get('/', (req, res) => {
    let message = getMessage('test')
    chat.sendMessage('5271474912870505', message)
    res.send({
        status: 200, message: '.....'
    })
})

// send server version.
server.get('/version', (req, res) => {
    res.send(version)
})

server.listen(port, () => {
    console.log(config.serverRunningMessage)
})

function getMessage(key) {
    let result = undefined

    for (i in keyword) {
        if (i.includes(key)) {
            result = keyword[i]
            break
        }
    }

    if (result === undefined) {
        return 'ไม่เข้าใจสิ่งที่คุณพูด'
    } else {
        return result
    }
}