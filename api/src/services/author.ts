import Author, { AuthorDocument } from '../models/Author'
import { NotFoundError } from '../helpers/apiError'

const create = async (author: AuthorDocument): Promise<AuthorDocument> => {
  const foundAuthor = await Author.findOne({ name: author.name }).exec()
  if (foundAuthor) {
    console.log('Found Author:', foundAuthor)
    return foundAuthor
  }
  const savedAuthor = author.save()
  console.log('Saved Author:', savedAuthor)
  return savedAuthor
}

const findByName = async (author: AuthorDocument): Promise<AuthorDocument> => {
  const foundAuthor = await Author.findOne({ name: author.name }).exec()
  if (!foundAuthor) {
    throw new NotFoundError(`Author ${author.name} not found`)
  }
  return foundAuthor
}

const findByNameContains = async (
  author: AuthorDocument
): Promise<AuthorDocument[]> => {
  console.log('findByNameContains for:', author)
  const foundAuthors = await Author.find({
    name: { $regex: author.name, $options: 'i' },
  }).exec()
  if (!foundAuthors) {
    throw new NotFoundError(`No Author names contain ${author.name}`)
  }
  return foundAuthors
}

const findById = async (authorId: string): Promise<AuthorDocument> => {
  const foundAuthor = await Author.findById(authorId)

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const findAll = async (): Promise<AuthorDocument[]> => {
  return Author.find()
    .sort({ name: 1 })
    .populate({ path: 'books', select: 'title' })
}

const update = async (
  authorId: string,
  update: Partial<AuthorDocument>
): Promise<AuthorDocument | null> => {
  const foundAuthor = await Author.findByIdAndUpdate(authorId, update, {
    new: true,
  })

  if (!foundAuthor) {
    throw new NotFoundError(`Movie ${authorId} not found`)
  }

  return foundAuthor
}

const deleteAuthor = async (
  authorId: string
): Promise<AuthorDocument | null> => {
  const foundAuthor = Author.findByIdAndDelete(authorId)

  if (!foundAuthor) {
    throw new NotFoundError(`Movie ${authorId} not found`)
  }

  return foundAuthor
}

const count = async (): Promise<number> => {
  var num = await Author.count()
  return num
}

export default {
  create,
  findByName,
  findByNameContains,
  findById,
  findAll,
  update,
  deleteAuthor,
  count,
}
