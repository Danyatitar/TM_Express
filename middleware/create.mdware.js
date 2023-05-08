const fs = require("fs");

function validateCreateBook(req, res, next) {
  const { bookId, title } = req.body;
  if (!bookId) {
    return res.status(400).send("bookId is required");
  }
  if (!title) {
    return res.status(400).send("Title is required");
  }
  const books = JSON.parse(fs.readFileSync("./data/books.json", "utf8"));
  const book = books.find((book) => book.id === bookId);
  if (book) {
    return res.status(400).send("Book with such bookId is already exists");
  }
  next();
}

function validateCreateReview(req, res, next) {
  const { bookId, reviewId, comment } = req.body;
  if (!bookId) {
    return res.status(400).send("bookId is required");
  }
  if (!reviewId) {
    return res.status(400).send("reviewId is required");
  }
  if (!comment) {
    return res.status(400).send("Comment is required");
  }
  const books = JSON.parse(fs.readFileSync("./data/books.json", "utf8"));
  const review = books
    .find((book) => book.id === bookId)
    .reviews.find((review) => review.id === reviewId);

  if (review) {
    return res.status(400).send("Review with such reviewId is already exists");
  }
  next();
}

module.exports.validateCreateBook = validateCreateBook;
module.exports.validateCreateReview = validateCreateReview;
