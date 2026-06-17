const router = require("express").Router();
const Book = require("../models/Book");

router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post("/", async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
});

router.delete("/:isbn", async (req, res) => {
  await Book.deleteOne({ isbn: req.params.isbn });
  res.json({ message: "Deleted" });
});

module.exports = router;