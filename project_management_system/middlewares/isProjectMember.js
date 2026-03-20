import { and, eq } from "drizzle-orm";
import { db } from "../configs/db.js";
import { projectMembers } from "../schemas/projectMember.js";

export const checkProjectMember = async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.body;

  try {
    const member = await db
      .select()
      .from(projectMembers)
      .where(
        and(
          eq(projectMembers.projectId, projectId),
          eq(projectMembers.userId, userId),
        ),
      );

    if (!member[0]) {
      return res.status(403).json({
        message: "Not a project member",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
        message : "error inside check member middleware",
    })
  }
};
