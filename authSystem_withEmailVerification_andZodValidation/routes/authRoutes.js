import express from "express";
import { signupcontroller } from "../controllers/authController.js";
import { upload } from "../configs/multer.config.js";
import { checkExistingUser } from "../middlewares/checkExistingUser.js";
import { Logincontroller } from "../../authentication_api/controllers/authController.js";


export const authRouter = express.Router();

authRouter.post('/signup', upload.single('profileImage'), checkExistingUser, signupcontroller );
authRouter.post('/login', Logincontroller);