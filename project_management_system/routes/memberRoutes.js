import express from "express";
import { addMember, assignTask,  } from "../controllers/memberController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkMemberRole } from "../middlewares/rbac.middleware.js";


export const memberRouter = express.Router();

memberRouter.post("/addmember", authenticate, checkMemberRole('OWNER'), addMember);
memberRouter.patch("/:taskId/assign", authenticate, checkMemberRole('OWNER'), assignTask );