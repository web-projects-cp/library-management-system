/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document ,Schema} from 'mongoose'

export type AuthorDocument = Document & {
  name: string
  books: string[]
}

export const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase:true,
  },
  books: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    },
    ],
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)
