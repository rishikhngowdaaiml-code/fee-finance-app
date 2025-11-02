const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

exports.sendSMS = (to, message) => {
  return client.messages.create({
    body: message,
    to,
    from: process.env.TWILIO_PHONE
  });
};