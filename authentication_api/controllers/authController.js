import bcrypt from "bcrypt";
import { db } from "../configs/db.js";
import { users } from "../configs/Schema.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const signUpcontroller = async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password) {
    return res.json({
      message : "fill the name email and pasword to complete signup"
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const signedUpUser = await db.insert(users).values({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User signed up successfully",
      data: signedUpUser.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "error while signing up user",
      error: error.message,
    });
  }
};

export const Logincontroller = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.json({
      message: "enter your login email and password"
    });
  }

  try {
    const result = await db.select().from(users).where(eq(users.email, email));

    if (result.length === 0) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    return res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

export const getProfileDetails = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, userId));

      if(result.length === 0) {
        return res.status(400).json({
            message : "user not found"
        })
      }

      return res.status(200).json({
        message : "user Found",
         user : result[0]
      })
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching profile"
    });

  }
};
