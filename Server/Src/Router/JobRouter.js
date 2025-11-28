import express from 'express';
import { getJob, applyJobs, listJobs } from '../Controllers/jobController.js';
import authenticateUser from '../Middleware/authenticateUser.js';
import optionalAuth from '../Middleware/optionalAuth.js';

const jobRouter = express.Router();

jobRouter.get('/', optionalAuth, listJobs);
jobRouter.get('/:id', optionalAuth, getJob);
jobRouter.post('/:id/apply', authenticateUser, applyJobs);

export default jobRouter;

