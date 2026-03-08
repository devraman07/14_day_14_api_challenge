import { eq } from "drizzle-orm";
import { db } from "../configs/db.js";
import { users } from "../configs/schemas/user.js";
import { comparePassword } from "../utils/matchPassword.js";
import { generateToken } from "../utils/generateToken.js";

export const signupController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await db
      .insert(users)
      .values({
        name,
        email,
        password,
      })
      .returning();

    return res.status(201).json({
      message: "User registered successfully",
      data: user[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while signup",
      error: error.message,
    });
  }
};

export const LoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user by email
    const result = await db.select().from(users).where(eq(users.email, email));

    if (result.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result[0];

    // compare password (bcrypt)
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // generate jwt token
    const token = generateToken(user);

    return res.status(200).json({
      message: "User login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while login",
      error: error.message,
    });
  }
};
