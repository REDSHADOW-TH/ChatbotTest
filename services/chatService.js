const config = require('../package.json').config
const http =require('request')

function sendMessage(recipient, message) {
    data = {
        recipient: recipient,
        message: {
            text: message
        }
    }
    http.post(`${config.api}/?access_token=${config.vertifyToken}`)
}

module.exports = {
    sendMessage
}