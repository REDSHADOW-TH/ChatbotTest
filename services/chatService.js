const config = require('../package.json').config
const request = require('request')

const api = 'https://graph.facebook.com/v9.0/me/messages'

function callSendAPI(sender_psid, response, fullMessage = null) {
  let request_body = null
  if (fullMessage === null) {
    request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": {
        "text": response
      }
    }
  } else {
    request_body = {
      "recipient": {
        "id": sender_psid
      },
      fullMessage
    }
  }

  console.log('message', request_body)


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


function sendTemplateExample(img1 = null, img2 = null) {
  let data = null
  let imgPath = ''
  let myData = {
    "message": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [
            {
              "title": "Welcome!",
              "image_url": "https://petersfancybrownhats.com/company_image.png",
              "subtitle": "We have the right hat for everyone.",
              "default_action": {
                "type": "web_url",
                "url": "https://petersfancybrownhats.com/view?item=103",
                "messenger_extensions": false,
                "webview_height_ratio": "tall",
                "fallback_url": "https://petersfancybrownhats.com/"
              },
              "buttons": [
                {
                  "type": "web_url",
                  "url": "https://petersfancybrownhats.com",
                  "title": "View Website"
                }, {
                  "type": "postback",
                  "title": "Start Chatting",
                  "payload": "DEVELOPER_DEFINED_PAYLOAD"
                }
              ]
            }
          ]
        }
      }
    }
  }


  if (imgPath === '') {
    return myData
  }
}

function makeGenericTemplate(senderId, title, subTitle, imgUrl) {
  return {
    status: 404, message: 'data is empty'
  }
}

function sendMessage(recipient, message) {
  if (message === 'template-example') {
    callSendAPI(recipient, message, sendTemplateExample())
  } else {
    callSendAPI(recipient, messgae)
  }
}

module.exports = {
  sendMessage
}