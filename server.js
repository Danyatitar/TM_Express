const express = require("express");
const booksRouter = require("./routes/books");
const reviewsRouter = require("./routes/reviews");

const app = express();
const port = 3001;

app.use(express.json());
app.use("/books", booksRouter);
app.use("/reviews", reviewsRouter);
app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});
app.listen(port, (err) => {
  console.log(`Server is starting at port ${port}`);
});
