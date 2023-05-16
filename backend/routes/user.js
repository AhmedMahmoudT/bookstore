import Router from 'express'
import { signupUser, loginUser, getUsers } from '../controllers/userController.js'

const router = Router()

// get Users
router.get('/', getUsers)

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

export default router