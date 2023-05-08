# Documentation

1. create book - method: POST path: /books
2. get list of books - method: GET path: /books
3. get book by id - method: GET path: /books/:bookId
4. edit book title - method: PATCH path: /books
5. add review for a book - method: POST path: /reviews/:bookId
6. delete review by id - method: DELETE path: /reviews
7. receive list of reviews by book id - method: GET path: /reviews

# Data

The list of books is stored in file data/books.json
The origin array is commented and stored in file data/books.js(This is for checking if you want to recover origin file, I don`t use it at program)

# How to start a project

To start a project write a command ```console
npm run start

```


```
