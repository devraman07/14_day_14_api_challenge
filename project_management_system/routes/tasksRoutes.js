import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { addtask, deleteTask, getTasksByProject, updateTask,  } from '../controllers/taskController.js';

 export const taskRouter = express.Router();

taskRouter.post('/addtask', authenticate, addtask );
taskRouter.get('/:id',  authenticate, getTasksByProject);
taskRouter.patch('/update/:id', authenticate, updateTask);
taskRouter.delete('/delete/:id', authenticate, deleteTask);