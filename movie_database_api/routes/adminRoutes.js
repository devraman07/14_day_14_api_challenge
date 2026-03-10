import express from 'express';
import { logincontroller, signupController } from '../controllers/admincontroller.js';

 export const adminRouter = express.Router();

adminRouter.post('/signup', signupController);
adminRouter.post('/login', logincontroller);