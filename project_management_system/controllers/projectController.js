import { and, eq } from "drizzle-orm";
import { db } from "../configs/db.js";
import { projects } from "../schemas/projects.js";
import { projectMembers } from "../schemas/projectMember.js";


export const addproject = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "fill the required details",
    });
  }

  try {
    
    const [project] = await db
      .insert(projects)
      .values({
        title,
        description,
        ownerId: req.user.id,
      })
      .returning();

   
    await db.insert(projectMembers).values({
      projectId: project.id,
      userId: req.user.id,
      role: "OWNER",
    });

    return res.status(201).json({
      message: "project created successfully",
      data: project,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error creating project",
      error: error.message,
    });
  }
};

export const getUserProjects = async (req, res) => {
  const userId = req.user.id;

  try {
    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.ownerId, userId));

    if (userProjects.length <= 0) {
      return res.json({
        message: "projects not found",
      });
    }

    return res.status(200).json({
      message: "fetched projects",
      data: userProjects,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getSingleProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.id, id),
          eq(projects.ownerId, userId)
        )
      );

    const project = result[0];

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.status(200).json({
      data: project,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};


export const updateProjects = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, status } = req.body;

    try {
        const result = await db.update(projects).set({
            title,
            description,
            status
        }).where(and(
            eq(projects.id, id),
            eq(projects.ownerId, userId)
        )).returning();

        if (!result[0]) {
            return res.status(404).json({
                message: "Project not found or unauthorized",
            });
        }

        return res.status(200).json({
            message: "Project updated successfully",
            data: result[0]
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error updating project",
            error: error.message
        });
    }
};



export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await db
      .delete(projects)
      .where(
        and(
          eq(projects.id, id),
          eq(projects.ownerId, userId)
        )
      )
      .returning();

    if (!result[0]) {
      return res.status(404).json({
        message: "Project not found or unauthorized",
      });
    }

    return res.status(200).json({
      message: "Project deleted",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting project",
    });
  }
};
