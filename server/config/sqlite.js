const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create/Open database file
const db = new sqlite3.Database(
  path.join(__dirname, "../database/books.db"),
  (err) => {
    if (err) {
      console.error("SQLite Error:", err.message);
    } else {
      console.log("SQLite Connected");

      // Create books table if it doesn't exist
      db.run(`
        CREATE TABLE IF NOT EXISTS books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          author TEXT NOT NULL,
          isbn TEXT
        )
      `);
    }
  }
);

module.exports = db;