import express from 'express';
import { getProfileDetails, Logincontroller, signUpcontroller } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

  const authRouter = express.Router();


authRouter.post('/signup', signUpcontroller);
authRouter.post('/login', Logincontroller);
authRouter.get('/profile', authenticate,getProfileDetails);


export default authRouter;