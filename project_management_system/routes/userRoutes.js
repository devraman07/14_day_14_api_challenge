import express from "express";
import { getuserById, loggedInController, loginController, signupHandler } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authenticate.js";

export const userRouter = express.Router();


userRouter.post('/signup', signupHandler);
userRouter.post('/login', loginController);
userRouter.get('/profile', authenticate, loggedInController);
userRouter.get('/:id', getuserById);