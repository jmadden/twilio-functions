exports.handler = function(context, event, callback) {
  let jwt = require('jsonwebtoken')
  let response = new Twilio.Response()

  const conferenceSid = event.sid
  const token = event.token
  const client = context.getTwilioClient();
  const callSid = event.callSid

  jwt.verify(token, context.AUTH_TOKEN, function(err, decoded) {
    if(err) {
      response.appendHeader('Status', 401)
      callback(null, response)
    } else {
      const resp = new Twilio.VoiceResponse();
      const dial = resp.dial();

      dial.conference({
        beep: false,
        startConferenceOnEnter: false,
        endConferenceOnExit: false,
        coach: callSid
      }, conferenceSid);
      callback(null, resp)
    }
  })
};
