import express from "express";
import { addproject, deleteProject, getSingleProject, getUserProjects, updateProjects } from "../controllers/projectController.js";
import { authenticate } from "../middlewares/authenticate.js";

export const projectRouter = express.Router();

projectRouter.post('/addproject', authenticate, addproject );
projectRouter.get('/userverifiedproject', authenticate, getUserProjects);
projectRouter.get('/userverifiedproject/:id', authenticate,getSingleProject );
projectRouter.patch('/update/:id', authenticate, updateProjects);
projectRouter.delete('/delete/:id', authenticate, deleteProject);