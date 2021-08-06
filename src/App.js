import React from 'react';
import { ZoomMtg } from "@zoomus/websdk";



ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.7/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function App() {

  
  var apiSecret = 'dXNpRJHw9Oeme5tqiNEvpBsJ8EfOh0UDBB25'
  var apiKey = 'MVfVOSCEQwGZNKFD2slZ-w'
  var meetingNumber = 97350326810
  var role = 0
  var leaveUrl = 'http://localhost:3000'
  var userName = 'React'
  var userEmail = ''
  var passWord = 'cPrBW6'

  const crypto = require("crypto"); 

  function generateSignature(apiKey, apiSecret, meetingNumber, role) {

      const timestamp = new Date().getTime() - 30000;
      const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
        "base64"
      );
      const hash = crypto
        .createHmac("sha256", apiSecret)
        .update(msg)
        .digest("base64");
      const signature = Buffer.from(
        `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
      ).toString("base64");
  
      return signature    
  }

  function getSignature(e) {
      let signature = generateSignature(apiKey, apiSecret, meetingNumber, role);
      startMeeting(signature)
  
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,          
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
