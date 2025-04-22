/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, Schema } from 'mongoose'

export type User = {
  firstname: string
  lastname: string
  email: string
  username: string
  password?: string
  borrowings: string[]
  isAdmin: boolean
}
export type UserDocument = Document & User

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  borrowings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
  isAdmin: {
    type: Boolean,
    default:false,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
