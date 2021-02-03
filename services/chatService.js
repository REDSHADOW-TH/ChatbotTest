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
    const msg = fullMessage.message
    request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": JSON.stringify({
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [
              {
                "title": "Welcome!",
                "image_url": "https://www.brother.co.th/-/media/ap/Common/Icons/Common/sns_brotherlogoicon.png",
                "subtitle": "ทดสอบการส่ง template เเละ รูปภาพ",
                "default_action": {
                  "type": "web_url",
                  "url": "c/",
                  "messenger_extensions": true,
                  "webview_height_ratio": "tall",
                  "fallback_url": "https://chatbot-test212.herokuapp.com/"
                }
              }
            ],"buttons":[
              {
                "type":"web_url",
                "url":"https://www.brother.co.th",
                "title":"ทดสอบปุ่ม (ไปที่ Bother)"
              },{
                "type":"postback",
                "title":"ตอบกลับเพจ",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]  
          }
        }
      })
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
    "message": JSON.stringify({
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [
            {
              "title": "Welcome!",
              "image_url": "https://dkt6rvnu67rqj.cloudfront.net/cdn/ff/T8cy0-640W8sartvA9TWmv08NbGPFxsVvf8gFtBDE08/1577112797/public/styles/600x400/public/media/int_files/elephant_in_tanzania.jpg?h=f507d761&itok=Ei8OXcGi",
              "subtitle": "We have the right hat for everyone.",
              "default_action": {
                "type": "web_url",
                "url": "https://petersfancybrownhats.com/view?item=103",
                "messenger_extensions": false,
                "webview_height_ratio": "tall",
                "fallback_url": "https://chatbot-test212.herokuapp.com/"
              }
            }
          ],"buttons":[
            {
              "type":"web_url",
              "url":"https://chatbot-test212.herokuapp.com/",
              "title":"View Website"
            },{
              "type":"postback",
              "title":"Start Chatting",
              "payload":"DEVELOPER_DEFINED_PAYLOAD"
            }              
          ]      
        }
      }
    })
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
    console.log('template case')
    callSendAPI(recipient, message, sendTemplateExample())
  } else {
    console.log('generic case')
    callSendAPI(recipient, message)
  }
}

module.exports = {
  sendMessage
}