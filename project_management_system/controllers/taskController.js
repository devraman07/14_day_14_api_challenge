import { and, eq } from "drizzle-orm";
import { db } from "../configs/db.js";
import { projects } from "../schemas/projects.js";
import { tasks } from "../schemas/tasks.js";

export const addtask = async (req, res) => {
  const userId = req.user.id;

  const { title, description, projectId } = req.body;

  try {
    const project = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.ownerId, userId)));

    if (!project[0]) {
      return res.status(403).json({
        message: "Not authorized for this project",
      });
    }

    const [task] = await db
      .insert(tasks)
      .values({
        title: title,
        description: description,
        projectId: projectId,
      })
      .returning();

    return res.status(201).json({
      message: "task created successfully",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding tasks",
      error: error.message,
    });
  }
};

export const getTasksByProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.id;

    const project = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.ownerId, userId)));

    if (!project[0]) {
      return res.json({
        message: "project not found",
      });
    }

    const taskByProject = await db
      .select()
      .from(tasks)
      .where(eq(tasks.projectId, projectId));

    return res.status(200).json({
      message: "tasks found",
      data: taskByProject,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching tasks",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const [task] = await db
      .update(tasks)
      .set({ status })
      .where(eq(tasks.id, id))
      .returning();

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task updated",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating tasks",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.delete(tasks).where(eq(tasks.id, id)).returning();

    if (!result[0]) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting task",
    });
  }
};
