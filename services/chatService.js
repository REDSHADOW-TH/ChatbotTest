const config = require('../package.json').config
const http = require('axios').default

function sendMessage(recipient, message) {
    data = {
        recipient: recipient,
        message: {
            text: message
        }
    }
    http.post(`${config.api}/?access_token=${config.vertifyToken}`, data)
    .then(() => {
        console.log('send success')
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = {
    sendMessage
}