const config = require('../package.json').config
const http = require('axios').default

const api = 'https://graph.facebook.com/v9.0/me/messages'

function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": {
          "text": response
      }
    }
    // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": config.vertifyTokens },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
  }

function sendMessage(recipient, message) {
    callSendAPI(recipient, message)
}

module.exports = {
    sendMessage
}