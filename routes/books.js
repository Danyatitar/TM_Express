const express = require("express");
const fs = require("fs");
const existMdware = require("../middleware/ifExist.mdware");
const createMdware = require("../middleware/create.mdware");
const router = express.Router();

router.get("/", (req, res) => {
  const books = JSON.parse(fs.readFileSync("./data/books.json", "utf8"));
  res.json(books);
});

router.get("/:bookId", existMdware.validateBookExists, (req, res) => {
  const books = JSON.parse(fs.readFileSync("./data/books.json", "utf8"));
  res.json([...books].find((item) => item.id === Number(req.params.bookId)));
});

router.post("/", createMdware.validateCreateBook, (req, res) => {
  const books = JSON.parse(fs.readFileSync("./data/books.json", "utf8"));
  books.push({ id: req.body.bookId, title: req.body.title, reviews: [] });
  fs.writeFileSync("./data/books.json", JSON.stringify(books), "utf8");
  res.send("book was added");
});

router.patch("/", existMdware.validateBookExists, (req, res) => {
  let books = JSON.parse(fs.readFileSync("./data/books.json", "utf8"));
  books = [...books].map((book) => {
    if (book.id === req.body.bookId) {
      res.json({ ...book, title: req.body.title });
      return { ...book, title: req.body.title };
    } else {
      return { ...book };
    }
  });
  fs.writeFileSync("./data/books.json", JSON.stringify(books), "utf8");
});

module.exports = router;
