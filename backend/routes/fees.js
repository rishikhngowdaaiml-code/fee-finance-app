const express = require('express');
const router = express.Router();
const { addStudent, sendDueAlerts } = require('../controllers/feeController');

router.post('/add-student', addStudent);
router.get('/send-alerts', sendDueAlerts);

module.exports = router;