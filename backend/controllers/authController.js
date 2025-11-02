const db = require('../models/db');
const { sendSMS } = require('../utils/sms');

exports.sendOTP = (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60000).toISOString();

  db.run(`REPLACE INTO otps (phone, otp, expires_at) VALUES (?, ?, ?)`, [phone, otp, expiresAt]);
  sendSMS(phone, `Your OTP is ${otp}`);
  res.json({ message: 'OTP sent' });
};

exports.verifyOTP = (req, res) => {
  const { phone, otp } = req.body;
  db.get(`SELECT * FROM otps WHERE phone = ?`, [phone], (err, row) => {
    if (!row || row.otp !== otp || new Date() > new Date(row.expires_at)) {
      return res.status(401).json({ message: 'Invalid or expired OTP' });
    }
    res.json({ message: 'OTP verified' });
  });
};