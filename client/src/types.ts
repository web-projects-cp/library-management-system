// A Book
export type Book = {
  _id: string
  isbn: string
  title: string
  image: string
  description: string
  publisher: string[]
  authors: Author[]
  category: string[]
  publishedYear: number
  refLink: string
  status: string
  borrowerId?: string
  borrowDate?: string
  returnDate?: string
}

export type CountResponse = {
  count: number
}

export type Author = {
  _id: string
  name: string
  books?: Book[]
}

export type User = {
  _id: string
  firstname: string
  lastname: string
  email: string
  username: string
  password: string
  borrowings: Book[]
  isAdmin: boolean
  resetLink: string
}
