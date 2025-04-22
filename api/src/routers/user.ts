import express from 'express'

import {
  createUser,
  findById,
  deleteUser,
  findAll,
  updateUser,
  count,
} from '../controllers/user'

import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
//Fetch all users
router.get('/', findAll)
router.get('/count', count)
//Fetch particular user
router.get('/:userId', findById)
//Update user
router.put('/:userId', updateUser)
//Delete user
router.delete('/:userId', deleteUser)
//Create User
router.post('/', createUser)

export default router
