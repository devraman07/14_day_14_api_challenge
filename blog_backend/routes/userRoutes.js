import express from 'express';
import { getUser, Loginhandler, signupcontroller } from '../controllers/userController.js';
import { authenticate } from '../services/authenticate.js';

 export const userRouter = express.Router();

userRouter.post('/signup',signupcontroller );
userRouter.post('/login', Loginhandler);
userRouter.get('/userprofile', authenticate, getUser);