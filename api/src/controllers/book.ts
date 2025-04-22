import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
import BookService from '../services/book'
import UserService from '../services/user'

import { BadRequestError } from '../helpers/apiError'

import Author from '../models/Author'
import AuthorService from '../services/author'
import { Schema } from 'mongoose'
import { NotFoundError } from '../helpers/apiError'

// POST /books
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //const { title, authorNames } = req.body

    const authorNames = req.body.authors

    if (authorNames.length === 0) {
      throw new NotFoundError(`Author ID not found`)
    }

    const recvdAuthorNames: string[] = authorNames

    const authorIds: Schema.Types.ObjectId[] = []

    for (var recvdAuthorName of recvdAuthorNames) {
      var author = new Author({
        name: recvdAuthorName,
      })

      try {
        const foundAuthor = await AuthorService.findByName(author)
        authorIds.push(foundAuthor._id)
      } catch (error) {
        console.log('Error:', error)
        if (error instanceof Error) {
          await AuthorService.create(author)
          authorIds.push(author._id)
        } else {
          next(error)
        }
      }
    }

    console.log('AuthorIds:', authorIds)
    const book = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      publisher: req.body.publisher,
      authors: authorIds,
      publishedyear: req.body.publishedyear,
      category: req.body.category,
    })

    await BookService.create(book)
    res.json(book)
  } catch (error) {
    console.log('Error:', error)
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /books/:bookId
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    const updatedBook = await BookService.update(bookId, update)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /books/:bookId
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BookService.deleteBook(req.params.bookId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /books/:bookId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findById(req.params.bookId))
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /books
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Controllers Books findAll')
  try {
    res.json(await BookService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findBooksOfAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorName = req.query.authors

  console.log('Controllers Books findBooksOfAuthors for:', authorName)

  const authorIds: Schema.Types.ObjectId[] = []

  var author = new Author({
    name: authorName,
  })

  try {
    const foundAuthors = await AuthorService.findByNameContains(author)
    for (const foundAuthor of foundAuthors) {
      authorIds.push(foundAuthor._id)
    }
    res.json(await BookService.findBooksOfAuthors(authorIds))
  } catch (error) {
    console.log('Error:', error)
    if (error instanceof Error) {
    } else {
      next(error)
    }
  }
}

const addBookToUsersBorrowList = async (
  userId: string,
  bookId: string,
  res: Response
) => {
  const updatedUser = await UserService.addBookToBorrowings(userId, bookId)
  res.json(updatedUser)
  console.log('addBookToUsersBorrowList Response:', res)
}

const removeBookFromUsersBorrowList = async (
  userId: string,
  bookId: string,
  res: Response
) => {
  const updatedUser = await UserService.removeBookFromBorrowings(userId, bookId)
  res.json(updatedUser)
  console.log('removeBookFromUsersBorrowList Response:', res)
}

// POST /books/borrow
export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('Request Body', req.body)
    const updatedBook = await BookService.updateBookBorrowedByUser(
      req.body.bookid,
      req.body.userid
    )
    addBookToUsersBorrowList(req.body.userid, req.body.bookid, res)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST /books/return
export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('Request Body', req.body)
    const updatedBook = await BookService.updateBookReturned(req.body.bookid)
    removeBookFromUsersBorrowList(req.body.userid, req.body.bookid, res)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findBooksBorrowedByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const borrowerid = req.query.userid

  var borrower = new Book({
    borrowerid: borrowerid,
  })

  console.log('Controllers Books findBooksBorrowedByUser for:', req)

  try {
    res.json(await BookService.findBooksBorrowedByUser(borrower))
  } catch (error) {
    console.log('Error:', error)
    if (error instanceof Error) {
    } else {
      next(error)
    }
  }
}

export const findBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('findBooks:', req.query)
  if (req.query.userid) {
    return await findBooksBorrowedByUser(req, res, next)
  }
  if (req.query.authors) {
    return await findBooksOfAuthors(req, res, next)
  }
}

export const count = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('count:', req.query)
  try {
    var num = await BookService.count()
    res.json({ count: num })
  } catch (error) {
    console.log('Error:', error)
    if (error instanceof Error) {
    } else {
      next(error)
    }
  }
}

export const countBorrowed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('countBorrowed:', req.query)
  try {
    var num = await BookService.countBorrowed()
    res.json({ count: num })
  } catch (error) {
    console.log('Error:', error)
    if (error instanceof Error) {
    } else {
      next(error)
    }
  }
}
