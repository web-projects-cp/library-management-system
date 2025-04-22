import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'
import { Schema } from 'mongoose'

const create = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const createPublisher = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const findById = async (bookId: string): Promise<BookDocument> => {
  const foundUser = await Book.findById(bookId).populate({
    path: 'authors',
    select: ['name'],
  })

  if (!foundUser) {
    throw new NotFoundError(`Book ID ${bookId} not found`)
  }

  return foundUser
}

const findAll = async (): Promise<BookDocument[]> => {
  //return Book.find().sort({ name: 1 })
  return Book.find()
    .populate({ path: 'authors', select: ['name'] })
    .populate({ path: 'borrowerid', select: ['firstname', 'lastname'] })
    .sort({ name: 1 })
}

const update = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
  })
    .populate({ path: 'authors', select: ['name'] })
    .populate({ path: 'borrowerid', select: ['firstname', 'lastname'] })

  if (!foundBook) {
    throw new NotFoundError(`Book ID ${bookId} not found`)
  }

  return foundBook
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ID ${bookId} not found`)
  }

  return foundBook
}

const findBooksOfAuthors = async (
  authorIds: Schema.Types.ObjectId[]
): Promise<BookDocument[]> => {
  console.log('Author Ids:', authorIds)
  return Book.find({ authors: { $in: authorIds } })
    .sort({ name: 1 })
    .populate({ path: 'authors', select: ['name'] })
    .populate({ path: 'borrowerid', select: ['firstname', 'lastname'] })
}

const findBooksBorrowedByUser = async (
  borrower: BookDocument
): Promise<BookDocument[]> => {
  return Book.find({ borrowerid: borrower.borrowerid })
    .sort({ name: 1 })
    .populate({ path: 'authors', select: ['name'] })
    .populate({ path: 'borrowerid', select: ['firstname', 'lastname'] })
}

const updateBookBorrowedByUser = async (
  bookId: string,
  userId: string
): Promise<BookDocument | null> => {
  const now = new Date()

  // set 5 days as due date
  const duedate = new Date()
  duedate.setDate(duedate.getDate() + 5)

  const borrowInfo = {
    status: 'Borrowed',
    borrowerid: userId,
    borrowdate: now,
    returndate: duedate,
  }

  const foundBook = await Book.findByIdAndUpdate(bookId, borrowInfo, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ID ${bookId} not found`)
  }

  return foundBook
  // Gives: MongooseError: Query was already executed: Book.findOneAndUpdate({ _id: new ObjectId("...
  // var updatedBook:BookDocument|null = null
  // await Book.findByIdAndUpdate(bookId, borrowInfo, function (err:Error, doc:BookDocument) {
  //   if (err) {
  //     // TODO - throw exceptions on update failure.
  //     console.log("Book's borrow status could not be updated")
  //   }
  //   else {
  //     console.log("Book is updated with borrow information")
  //     updatedBook = doc
  //   }
  // })
  // return updatedBook
}

const updateBookReturned = async (
  bookId: string
): Promise<BookDocument | null> => {
  const now = new Date()

  const borrowInfo = {
    status: 'Available',
    borrowerid: null,
    borrowdate: null,
    returndate: null,
  }

  const foundBook = await Book.findByIdAndUpdate(bookId, borrowInfo, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ID ${bookId} not found`)
  }

  return foundBook
}

const count = async (): Promise<number> => {
  var num = await Book.count()
  return num
}

const countBorrowed = async (): Promise<number> => {
  var num = await Book.count({ status: 'Borrowed' })
  return num
}

export default {
  create,
  createPublisher,
  findById,
  findAll,
  update,
  deleteBook,
  findBooksOfAuthors,
  findBooksBorrowedByUser,
  updateBookBorrowedByUser,
  updateBookReturned,
  count,
  countBorrowed,
}
