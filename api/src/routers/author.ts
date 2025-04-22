import express from 'express'

import {
  createAuthor,
  findById,
  deleteAuthor,
  findAll,
  updateAuthor,
  count,
} from '../controllers/author'
import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

// Every path we define here will get /api/v1/author prefix
// Fetch all authors
router.get('/', findAll)
// Fetch total number of authors
router.get('/count', count)

//Fetch particular author
router.get('/:authorId', findById)
//Update author
router.put('/:authorId', updateAuthor)
//Remove author
router.delete('/:authorId', deleteAuthor)
//Create author
router.post('/', createAuthor)

export default router
