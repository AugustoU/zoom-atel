import React from 'react';
import { useParams } from 'react-router-dom';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.7/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

const Zoom = () => {
  let { room } = useParams();
  const params = room.split('-');

  let apiSecret = 'dXNpRJHw9Oeme5tqiNEvpBsJ8EfOh0UDBB25',
    apiKey = 'MVfVOSCEQwGZNKFD2slZ-w',
    meetingNumber = params[0],
    role = 0,
    leaveUrl = 'http://localhost:3000',
    userName = params[2],
    userEmail = '',
    passWord = params[1];

  const crypto = require('crypto');

  function generateSignature(apiKey, apiSecret, meetingNumber, role) {
    const timestamp = new Date().getTime() - 30000;
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
      'base64'
    );
    const hash = crypto
      .createHmac('sha256', apiSecret)
      .update(msg)
      .digest('base64');
    const signature = Buffer.from(
      `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
    ).toString('base64');

    return signature;
  }

  function getSignature(e) {
    let signature = generateSignature(apiKey, apiSecret, meetingNumber, role);
    startMeeting(signature);
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success);
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  
  getSignature();
  var click = document.getElementsByClassName("zm-btn joinWindowBtn btn btn-primary btn-block btn-lg submit zm-btn--default zm-btn__outline--blue")
  click[0].click();

  return <></>;
};

export default Zoom;
