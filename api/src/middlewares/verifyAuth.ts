import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ForbiddenError } from '../helpers/apiError'

export default function verifyAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const auth = req.headers.authorization || ''
    const token = auth.split(' ')[1]
    const JWT_SECRET = process.env.JWT_SECRET as string

    const user = jwt.verify(token, JWT_SECRET)
    req.user = user
    next()
  } catch (error) {
    console.log('error:', error)
    throw new ForbiddenError()
  }
}