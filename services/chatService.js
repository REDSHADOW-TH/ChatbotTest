const config = require('../package.json').config
const request = require('request')

const api = 'https://graph.facebook.com/v9.0/me/messages'

function callSendAPI(sender_psid, response) {
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": {
          "text": response
      }
    }
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": config.vertifyToken },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
        console.log(body)
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
  }

function makeGenericTemplate(senderId, title, subTitle, imgUrl) {
    let data = {
        
    }
}

function sendMessage(recipient, message) {
    callSendAPI(recipient, message)
}

module.exports = {
    sendMessage
}