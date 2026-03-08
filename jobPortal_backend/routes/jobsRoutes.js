import express from 'express';
import { RoleCheck } from '../middlewares/isAdmin.js';
import { addJobs,  alljobs,  deletejob,  getpostedJobs,  updateJob } from '../controllers/jobsController.js';
import { authenticate } from '../middlewares/authenticate.js';

export const jobRouter = express.Router();

jobRouter.post('/addjobs', authenticate, RoleCheck,  addJobs );
jobRouter.put('/updatejobs/:id',authenticate, RoleCheck, updateJob);
jobRouter.delete('/deletejob/:id', authenticate, RoleCheck, deletejob);
jobRouter.get('/getmyjobs', authenticate, RoleCheck, getpostedJobs);
jobRouter.get('/alljobs', alljobs);