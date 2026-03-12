import express from "express";
import { signupController } from "../controllers/signupController.js";
import { upload } from "../middlewares/multer.config.js";

export const signupRouter = express.Router();

signupRouter.post('/signup', upload.single("profileImage"), signupController);