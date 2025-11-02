const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./models/finance.db');

module.exports = db;