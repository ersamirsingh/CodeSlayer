import express from 'express'
const adminRouter = express.Router()
import { 
   overview, listUsers, listJobs, listDisputes, blockUser, unblockUser, deleteUser, deleteJob, 
   deleteDispute, assignMediator, 
   verifyUser,
   unverifyUser,
   getUserDetails,
   getJobDetails,
   getDisputeDetails,
   getAllMediators,
   getAllEmployers,
   getAllLabourers
} from '../Controllers/adminController'
import authenticateAdmin from '../Middleware/authenticateAdmin'


adminRouter.get('/overview', authenticateAdmin, overview)
adminRouter.get('/list-users', authenticateAdmin, listUsers)
adminRouter.get('/list-jobs', authenticateAdmin, listJobs)
adminRouter.patch('/disputes/:disputeId', authenticateAdmin, listDisputes)
adminRouter.patch('/block-user/:userId', authenticateAdmin, blockUser)
adminRouter.patch('/unblock-user/:userId', authenticateAdmin, unblockUser)
adminRouter.delete('/delete-user/:userId', authenticateAdmin, deleteUser)
adminRouter.delete('delete-job', authenticateAdmin, deleteJob)
adminRouter.delete('delete-dispute', authenticateAdmin, deleteDispute)
adminRouter.patch('/assign-mediator/:disputeId', authenticateAdmin, assignMediator)
adminRouter.patch('/verify-user/:userId', authenticateAdmin, verifyUser)
adminRouter.patch('/unverify-user/:userId', authenticateAdmin, unverifyUser)
adminRouter.patch('/get-user-details', authenticateAdmin, getUserDetails)
adminRouter.get('/get-job-details/:jobId', authenticateAdmin, getJobDetails)
adminRouter.get('/get-dispute-details/:disputeId', authenticateAdmin, getDisputeDetails)
adminRouter.get('/get-all-mediator', authenticateAdmin, getAllMediators)
adminRouter.get('/get-all-employer', authenticateAdmin, getAllEmployers)
adminRouter.get('/get-all-labourers', authenticateAdmin, getAllLabourers)




export default adminRouter

