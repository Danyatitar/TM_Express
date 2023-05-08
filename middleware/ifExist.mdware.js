const fs = require("fs");

function validateBookExists(req, res, next) {
  let bookId = parseInt(req.params.bookId);

  if (!bookId) {
    bookId = parseInt(req.body.bookId);
  }
  console.log(bookId);
  const books = JSON.parse(fs.readFileSync("./data/books.json", "utf8"));
  const book = books.find((book) => book.id === bookId);

  if (!book) {
    return res.status(404).send("Book not found");
  }
  next();
}

function validateReviewExists(req, res, next) {
  const reviewId = parseInt(req.body.reviewId);
  let bookId = parseInt(req.params.bookId);

  if (!bookId) {
    bookId = parseInt(req.body.bookId);
  }
  const books = JSON.parse(fs.readFileSync("./data/books.json", "utf8"));
  const review = books
    .find((book) => book.id === bookId)
    .reviews.find((review) => review.id === reviewId);
  if (!review) {
    return res.status(404).send("Review not found");
  }
  next();
}

module.exports.validateBookExists = validateBookExists;
module.exports.validateReviewExists = validateReviewExists;
