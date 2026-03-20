import express from "express";
import { addMember, assignTask,  } from "../controllers/memberController.js";
import { authenticate } from "../middlewares/authenticate.js";


export const memberRouter = express.Router();

memberRouter.post("/addmember", authenticate, addMember);
memberRouter.patch("/:taskId/assign", authenticate, assignTask );