import express from "express";
import { AddTodos, DeleteTodo, getTodo, GetTodoById } from "../controllers/todoController.js";
import { CheckIfdone } from "../services/statusCheck.js";

const router = express.Router();

router.get('/', getTodo);
router.get('/:id', GetTodoById);
router.post("/addtodo", AddTodos);
router.patch('/:id/check', CheckIfdone);
router.delete('/:id/', DeleteTodo);

export default router;