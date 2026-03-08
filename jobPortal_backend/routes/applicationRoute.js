import express from 'express';
import { applicationHandler, getownApplications } from '../controllers/applicationcontroller.js';
import { authenticate } from '../middlewares/authenticate.js';

export const applicationRouter = express.Router();

applicationRouter.post('/apply/:id', authenticate, applicationHandler);
applicationRouter.get('/myapplications', authenticate,getownApplications );