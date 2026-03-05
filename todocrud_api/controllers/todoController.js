import { eq } from "drizzle-orm";
import { db } from "../configs/db.js";
import { todos } from "../configs/schema.js";

export const AddTodos = async (req, res) => {
  try {
    await db.insert(todos).values(req.body);
    const result = await db.select().from(todos);
    console.log("Successfully queried the database:");
    return res.status(201).json({
      message: "todo created successfully",
      result: result,
    });
  } catch (error) {
    console.error("Error querying the database:", error);
    return res.status(500).json({
      message: "Error while adding todo in the database",
      err: error.message,
    });
  }
};

export const getTodo  = async (req,res) => {
   try {
      const todo = await db.select().from(todos);
      if(todo.length === 0) {
        return res.status(400).json({
            message:"todo not found",
        })
      } 
      return res.status(200).json({
        message : "all Todos",
        data : todo
      })
   } catch (error) {
    return res.status(500).json({
      message: "Error while fetching all todo from the database",
      err: error.message,
    });
   }
}

export const GetTodoById = async (req, res) => {
    try {
       const id = Number(req.params.id); 
       const todoByid = await db.select().from(todos).where(eq(todos.id, id));
       if(todoByid.length === 0) {
        return res.status(400).json({
            message : "Todo not found"
        });
       }
       return res.status(200).json({
        message : `this is todo with id : ${id}`,
        data : todoByid
       });
    } catch (error) {
        return res.status(500).json({
      message: `error while adding todo with id : ${id}`,
      err: error.message,
    });
    }
}

export const DeleteTodo = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const todo = await db.select().from(todos).where(eq(todos.id, id));

    if (todo.length === 0) {
      return res.status(404).json({
        message: "todo not found",
      });
    }

    if (todo[0].status !== "completed") {
      return res.status(400).json({
        message: "only completed todo can be deleted",
      });
    }

    const deletedTodo = await db.delete(todos).where(eq(todos.id, id));

    return res.status(200).json({
      message: "Todo Deleted successfully",
      data: deletedTodo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting todo",
      error: error.message,
    });
  }
};
