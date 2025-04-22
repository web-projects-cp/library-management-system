/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, Schema } from 'mongoose'

export type BookDocument = Document & {
  isbn: string
  title: string
  image: string
  description: string
  publisher: string
  authors: string[]
  status: string
  publishedyear: number
  category: string[]
  borrowerid?: string
  borrowdate?: Date
  returndate?: Date
}

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    index: true,
    trim: true,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
  },
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Author',
    },
  ],
  status: {
    type: String,
    default: 'Available',
  },
  publishedyear: {
    type: Number,
  },
  category: [
    {
      type: String,
      required: true,
    },
  ],
  borrowerid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  borrowdate: {
    type: Date,
    //   default:Date.now,
  },
  returndate: {
    type: Date,
    // default: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
