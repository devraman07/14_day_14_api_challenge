import { and, eq } from "drizzle-orm";
import { db } from "../configs/db.js";
import { projectMembers } from "../schemas/projectMember.js";
import { projects } from "../schemas/projects.js";
import { tasks } from "../schemas/tasks.js";

export const addMember = async (req, res) => {
  const { projectId, userId } = req.body;
  const currrentUser = req.user.id;

  try {
    const project = await db
      .select()
      .from(projects)
      .where(
        and(eq(projects.id, projectId), eq(projects.ownerId, currrentUser)),
      );

    if (!project[0]) {
      return res.json({
        message: "you need to own a project for adding member",
      });
    }

    const [member] = await db
      .insert(projectMembers)
      .values({
        projectId: projectId,
        userId: userId,
      })
      .returning();

    return res.status(201).json({
      message: "member added successfully",
      data: member,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error while adding member",
      error: error.message,
    });
  }
};

export const assignTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "userId is required",
      });
    }

    const [task] = await db
      .update(tasks)
      .set({ assignedTo: userId })
      .where(eq(tasks.id, taskId))
      .returning();

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task assigned successfully",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error assigning task",
      error: error.message,
    });
  }
};
