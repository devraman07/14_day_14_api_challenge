import { eq } from "drizzle-orm";
import { db } from "../configs/db.js";
import { users } from "../schemas/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/generateToken.js";

export const signupHandler = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.json({
        message: "fill up the credentials",
      });
    }

    const existingEmail = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingEmail.length > 0) {
      return res.json({
        message: "user already exists",
      });
    }

    const Hashedpassword = await bcrypt.hash(password, 10);

    const user = await db.insert(users).values({
      name: name,
      email: email,
      password: Hashedpassword,
    });

    return res.status(201).json({
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const sanitizeUser = (user) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.select().from(users).where(eq(users.email, email));

    const user = result[0];

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    const safeUser = sanitizeUser(user);

    return res.status(200).json({
      message: "User login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const loggedInController = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (result.length === 0) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    return res.status(200).json({
      message: "user Found",
      user: result[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getuserById = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.select().from(users).where(eq(users.id, id));
    if (result.length <= 0) {
      return res.json({
        message: "user not found",
      });
    }
    const user = result[0];

    return res.status(200).json({
      message: "user found",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
