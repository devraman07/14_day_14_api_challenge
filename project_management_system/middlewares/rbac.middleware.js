import { and, eq } from "drizzle-orm";
import { db } from "../configs/db.js";
import { projectMembers } from "../schemas/projectMember.js";

export const checkMemberRole = (requiredRole) => {
  return async (req, res, next) => {
    const projectId = req.params.projectId || req.body.projectId;
    const userId = req.user.id;

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
          message: "not a project member",
        });
      }

      if (member[0].role !== requiredRole) {
        return res.status(403).json({
          message: "access denied",
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        message: "RBAC error",
      });
    }
  };
};
