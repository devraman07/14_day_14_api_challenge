import express from "express";
import { signupcontroller } from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.post('/signup', signupcontroller );