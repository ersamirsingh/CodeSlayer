import express from 'express'
const userRouter = express.Router()
import { getUserDetails } from '../Controllers/adminController.js'
import authenticateAdmin from '../Middleware/authenticateAdmin.js'
import authenticateUser from '../Middleware/authenticateUser.js'
import { 
   deleteProfile, fetchProfile, getNearbyUsers, rateUser, updateLocation, updateProfile 
} from '../Controllers/userController.js'
import authenticateEmployer from '../Middleware/authenticateEmployer.js'



userRouter.get('/get', authenticateUser, fetchProfile)
userRouter.patch('/update', authenticateUser, updateProfile)
userRouter.delete('/delete', authenticateUser, deleteProfile)
userRouter.patch('update/location', authenticateUser, updateLocation)
userRouter.get('/finduser', authenticateEmployer , getNearbyUsers)
userRouter.patch('/rate', authenticateUser, rateUser)



export default userRouter