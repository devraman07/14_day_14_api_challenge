import { db } from "../configs/db.js";
import { demoUsers } from "../configs/schema.js";
import { eq } from "drizzle-orm";

export const AddUser = async (req, res) => {
  try {
    const newUser = await db.insert(demoUsers).values(req.body).returning();

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error querying the database:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getallUser = async (req, res) => {
  try {
    const users = await db.select().from(demoUsers);

    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getUserByid = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await db.select().from(demoUsers).where(eq(demoUsers.id, id));

    if (user.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User found with requested id",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedUser = await db
      .update(demoUsers)
      .set({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
      })
      .where(eq(demoUsers.id, id));

    if (updatedUser.length === 0) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    return res.status(200).json({
      message: "user updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const deletedUser = await db
      .delete(demoUsers)
      .where(eq(demoUsers.id, id))
      .returning();

    if (deletedUser.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}; 
