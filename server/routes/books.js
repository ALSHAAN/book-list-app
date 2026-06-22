const router = require("express").Router();
const Book = require("../models/Book");
const db = require("../config/sqlite");

router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post("/", async (req, res) => {
  console.log("Request Body:", req.body);

  const book = await Book.create(req.body);

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
  await Book.deleteOne({ isbn: req.params.isbn });
  res.json({ message: "Deleted" });
});

module.exports = router;