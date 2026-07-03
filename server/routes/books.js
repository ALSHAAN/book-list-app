const router = require("express").Router();
const Book = require("../models/Book");
const db = require("../config/sqlite");

router.get("/", async (req, res) => {
  const books = await Book.find({
    userId: req.query.userId
});
  res.json(books);
});

router.post("/", async (req, res) => {

  console.log("Request Body:", req.body);

  const { title, author, isbn, genre, status, userId } = req.body;

  // Validation 1: Required fields
  if (!title || !author || !isbn || !genre || !status || !userId) {
    return res.status(400).json({
      message: "All fields are required."
    });
  }

  // Validation 2: ISBN length
  if (isbn.length < 6) {
    return res.status(400).json({
      message: "ISBN must be at least 6 characters."
    });
  }

// Check duplicate ISBN only for the same user
const existingBook = await Book.findOne({
  isbn,
  userId
});



if (existingBook) {
  return res.status(400).json({
    message: "You already have this book."
  });
}

const book = await Book.create({
  title,
  author,
  isbn,
  genre,
  status,
  userId
});

  db.run(
    "INSERT INTO books(title, author, isbn) VALUES (?, ?, ?)",
    [req.body.title, req.body.author, req.body.isbn],
    function(err) {
      if (err) {
        console.log("SQLite Error:", err.message);
      } else {
        console.log("Inserted into SQLite. Row ID:", this.lastID);
      }
    }
  );

  res.json(book);
});

router.delete("/:isbn", async (req, res) => {

  await Book.deleteOne({
      isbn: req.params.isbn,
      userId: req.query.userId
  });

  res.json({
      message: "Deleted"
  });

});

module.exports = router;