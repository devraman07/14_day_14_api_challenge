import express from "express";
import {  LoginController, signupController  } from "../controllers/userController.js";
import { generateHashedPassword } from "../middlewares/generateHashedPassword.js";



export const userRouter = express.Router();

userRouter.post('/signup', generateHashedPassword, signupController );
userRouter.post('/login',  LoginController);