import { eq } from "drizzle-orm";
import { db } from "../configs/db.js";
import { todos } from "../configs/schema.js";


export const CheckIfdone = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const Completedtodo = await db
      .update(todos)
      .set({
        isChecked: true,
        status: "completed"
      })
      .where(eq(todos.id, id))
      .returning();

    if (Completedtodo.length === 0) {
      return res.status(404).json({
        message: "todo not found"
      });
    }

    return res.status(200).json({
      message: "todo completed successfully",
      data: Completedtodo
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error updating todo",
      error: error.message
    });
  }
};