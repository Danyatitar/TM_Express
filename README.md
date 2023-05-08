# Documentation

create book - method: POST path: /books
get list of books - method: GET path: /books
get book by id - method: GET path: /books/:bookId
edit book title - method: PATCH path: /books
add review for a book - method: POST path: /reviews/:bookId
delete review by id - method: DELETE path: /reviews
receive list of reviews by book id - method: GET path: /reviews

# Data

The list of books is stored in file data/books.json
The origin array is commented and stored in file data/books.js(This is for checking if you want to recover origin file, I don`t use it at program)

# How to start a project

To start a project write a command 
npm run start


