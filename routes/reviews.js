const express = require("express");
const fs = require("fs");
const existMdware = require("../middleware/ifExist.mdware");
const createMdware = require("../middleware/create.mdware");
const router = express.Router();

router.get("/:bookId", existMdware.validateBookExists, (req, res) => {
  const books = JSON.parse(fs.readFileSync("./data/books.json", "utf8"));
  const reviews = [...books].find(
    (item) => item.id === Number(req.params.bookId)
  ).reviews;
  console.log(reviews);
  res.json(reviews);
});

router.post(
  "/",
  [existMdware.validateBookExists, createMdware.validateCreateReview],
  (req, res) => {
    let books = JSON.parse(fs.readFileSync("./data/books.json", "utf8"));
    const reviews = [...books].find(
      (item) => item.id === Number(req.body.bookId)
    ).reviews;

    reviews.push({ id: req.body.reviewId, comment: req.body.comment });
    books = [...books].map((book) => {
      if (book.id === req.body.bookId) {
        return { ...book, reviews };
      } else {
        return { ...book };
      }
    });
    fs.writeFileSync("./data/books.json", JSON.stringify(books), "utf8");
    res.send("Review was added");
  }
);

router.delete(
  "/",
  [existMdware.validateBookExists, existMdware.validateReviewExists],
  (req, res) => {
    let books = JSON.parse(fs.readFileSync("./data/books.json", "utf8"));
    const reviews = [...books]
      .find((item) => item.id === Number(req.body.bookId))
      .reviews.find((review) => review.id === req.body.reviewId);

    books = [...books].map((book) => {
      if (book.id === req.body.bookId) {
        return { ...book, reviews };
      } else {
        return { ...book };
      }
    });

    fs.writeFileSync("./data/books.json", JSON.stringify(books), "utf8");
    res.send("review was deleted");
  }
);
module.exports = router;
