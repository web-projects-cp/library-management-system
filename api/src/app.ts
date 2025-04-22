import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import cors from 'cors'

import userRouter from './routers/user'
import bookRouter from './routers/book'
import authorRouter from './routers/author'
import loginWithGoogle from './passport/google'
import { JWT_SECRET } from './util/secrets'
import { User } from './models/User'

import verifyAuth from './middlewares/verifyAuth'

//import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 5000)

// Global middleware
app.use(apiContentType)
app.use(express.json())
app.use(cors())

app.use(passport.initialize())
passport.use(loginWithGoogle())

// this should be moved to the router
app.post(
  '/api/v1/google-login',
  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    //console.log('Request.User: ', req.user)
    //console.log('Response: ', res)
    const user = req.user as User
    const token = jwt.sign(
      { email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    )
    res.cookie('token', token, { httpOnly: true })
    res.json({ token: token, user_details: req.user })
  }
)

app.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true })
  res.json({ message: 'Logged out successfully' })
})

// Set up routers
app.post('/verify-token', verifyAuth, (req, res) => {
  const user = req.user
  res.json({ user })
})

// Set up routers
app.use('/api/v1/users', userRouter)
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/authors', authorRouter)

// Custom API error handler
//app.use(apiErrorHandler)

export default app
