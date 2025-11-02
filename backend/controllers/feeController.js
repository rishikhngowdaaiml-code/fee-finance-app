const db = require('../models/db');
const { sendSMS } = require('../utils/sms');

exports.addStudent = (req, res) => {
  const { name, phone, due_date } = req.body;
  db.run(`INSERT INTO students (name, phone, due_date) VALUES (?, ?, ?)`, [name, phone, due_date], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
};

exports.sendDueAlerts = (req, res) => {
  const today = new Date();
  const threshold = new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0];

  db.all(`SELECT * FROM students WHERE due_date <= ?`, [threshold], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    rows.forEach(student => {
      const msg = `Hi ${student.name}, your fee is due on ${student.due_date}. Please pay soon.`;
      sendSMS(student.phone, msg);
    });

    res.json({ message: 'Alerts sent', count: rows.length });
  });
};