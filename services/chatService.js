const config = require('../package.json').config
const http = require('axios').default

const api = 'https://graph.facebook.com/v9.0/me/messages'

function sendMessage(recipient, message) {
    data = {
        recipient: {recipient},
        message: {
            text: message
        }
    }
    console.log(data)
    http.post(`${api}?access_token=${config.vertifyToken}`, data, {
        'Content-Type': 'application/json'
    })
    .then(() => {
        console.log('send success')
    }).catch((err) => {
        
    })
}

module.exports = {
    sendMessage
}