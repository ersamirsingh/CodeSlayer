import express from 'express'
const userRouter = express.Router()
import authenticateUser from '../Middleware/authenticateUser.js'
import { 
   deleteProfile, fetchProfile, getNearbyUsers, rateUser, updateLocation, updateProfile 
} from '../Controllers/userController.js'
import { createJob } from '../Controllers/jobController.js'



userRouter.get('/get', authenticateUser, fetchProfile)
userRouter.patch('/update', authenticateUser, updateProfile)
userRouter.delete('/delete', authenticateUser, deleteProfile)
userRouter.patch('update/location', authenticateUser, updateLocation)
userRouter.get('/finduser', authenticateUser , getNearbyUsers)
userRouter.patch('/rate', authenticateUser, rateUser)
userRouter.post('/jobs', authenticateUser, createJob)



export default userRouter
