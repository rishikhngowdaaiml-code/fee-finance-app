const Database = require('better-sqlite3');

// Creates (or opens) the database file
const db = new Database('./models/finance.db', { verbose: console.log });

// Export the db instance for use in other files
module.exports = db;
