import express from 'express'

import {
  createBook,
  findById,
  deleteBook,
  findAll,
  updateBook,
  findBooks,
  borrowBook,
  returnBook,
  count,
  countBorrowed,
} from '../controllers/book'

import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix

//Fetch all books
router.get('/', findAll)

//Fetch books for given word that is a part or whole of an author name
// Example for searching by author name:
// HTTP Post:
// http://localhost:5000/api/v1/books/search?authors=nithish

// Example for searching by userid:
// HTTP Post:
// http://localhost:5000/api/v1/books/search?userid=6293ad8cbb73505091379f8d
router.get('/search', findBooks)

// Fetch total number of books
// HTTP Get:
// http://localhost:5000/api/v1/books/count
router.get('/count', count)

// Fetch total number of books
// HTTP Get:
// http://localhost:5000/api/v1/books/count-borrowed
router.get('/count-borrowed', countBorrowed)

//Fetch particular book
router.get('/:bookId', findById)

// Borrow Book
// /borrow
// Example:
// HTTP Post:
// http://localhost:5000/api/v1/books/borrow
// {
// 	"bookid": "6292032de347b00f9d4544d1",
// 	"userid": "6293ad8cbb73505091379f8d"
// }
router.post('/borrow', borrowBook)

// Return book
// /books/return
// Example:
// HTTP Post:
// http://localhost:5000/api/v1/books/return
// {
// 	"bookid": "6292032de347b00f9d4544d1"
// 	"userid": "6293ad8cbb73505091379f8d"
// }
router.post('/return', returnBook)

//Add new book
router.post('/', createBook)
//Remove book
router.delete('/:bookId', deleteBook)
// Update book
router.put('/:bookId', updateBook)

export default router
