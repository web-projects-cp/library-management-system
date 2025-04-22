import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const create = async (user: UserDocument): Promise<UserDocument> => {
  console.log('At create')
  return user.save()
}

const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().sort({ name: 1 })
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const findOne = async (email: string): Promise<UserDocument | null> => {
  console.log('email:', email)
  return User.findOne({ email })
}

const save = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const count = async (): Promise<number> => {
  var num = await User.count()
  return num
}

export const addBookToBorrowings = async (
  userId: string,
  bookId: string
): Promise<UserDocument | any> => {
  const foundUser = await User.updateOne(
    { _id: userId },
    { $push: { borrowings: bookId } }
  )

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

export const removeBookFromBorrowings = async (
  userId: string,
  bookId: string
): Promise<UserDocument | any> => {
  const foundUser = await User.updateOne(
    { _id: userId },
    { $pull: { borrowings: bookId } }
  )

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteUser,
  findOne,
  save,
  count,
  addBookToBorrowings,
  removeBookFromBorrowings,
}
