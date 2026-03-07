import { blogs } from "../configs/schema/blog.js";
import { db } from "../configs/db.js";
import { eq } from "drizzle-orm";

export const AddBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    const Blog = await db
      .insert(blogs)
      .values({
        title,
        content,
        authorId: req.user.id,
      })
      .returning();

    if (Blog.length === 0) {
      return res.status(400).json({
        message: "error while adding blog",
      });
    }

    return res.status(201).json({
      message: "Blog posted successfully",
      data: Blog[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "error while adding Blog",
      error: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({
      message: "Invalid blog id",
    });
  }

  const { title, content } = req.body;

  try {
    const blog = await db.select().from(blogs).where(eq(blogs.id, id));

    if (blog.length === 0) {
      return res.status(404).json({
        message: "blog not found",
      });
    }

    const existingBlog = blog[0];

    if (existingBlog.authorId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        message: "not allowed to update this blog",
      });
    }

    const updatedBlog = await db
      .update(blogs)
      .set({
        title,
        content,
        updatedAt: new Date(),
      })
      .where(eq(blogs.id, id))
      .returning();

    return res.status(200).json({
      message: "blog updated successfully",
      data: updatedBlog[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "error while updating Blog",
      error: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const Blog = await db.select().from(blogs).where(eq(blogs.id, id));

    const existingBlog = Blog[0];

    if (existingBlog.authorId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        message: "not allowed to delete this blog",
      });
    }

    await db.delete(blogs).where(eq(blogs.id, id));

    return res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while deleting blog",
      error: error.message,
    });
  }
};

export const getMyBlogs = async (req, res) => {
  const userId = req.user.id;

  try {
    const myBlogs = await db
      .select()
      .from(blogs)
      .where(eq(blogs.authorId, userId));

    return res.status(200).json({
      message: "My blogs fetched successfully",
      data: myBlogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching my blogs",
      error: error.message,
    });
  }
};
