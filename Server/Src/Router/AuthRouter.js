import express from 'express'
const authRouter = express.Router()
import { Login, Register, Logout, validUser } from '../Controllers/AuthController.js'
import authenticateUser from '../Middleware/authenticateUser.js'


authRouter.post('/register', Register)
authRouter.post('/login', Login)
authRouter.get('/logout', authenticateUser, Logout)
authRouter.get('/check', validUser)






export default authRouter