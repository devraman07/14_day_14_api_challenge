import bcrypt from "bcrypt";
import { db } from "../../authentication_api/configs/db.js";
import { users } from "../configs/schema/user.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const signupcontroller = async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password) {
    return res.status(401).json({
      message : "name email aur password daal lawde"
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    if(hashedPassword.length < 10) {
      return res.status(403).json({
        message : " thoda bada passowrd daal lawde"
      });
    }

    const user = await db
      .insert(users)
      .values({
        name: name,
        email: email,
        password: hashedPassword,
      })
      .returning();

    if (user.length === 0) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    return res.status(200).json({
      message: "user registered succesfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error while signup",
      error: error.message,
    });
  }
};

export const Loginhandler = async (req, res) => {
  const { email, password } = req.body;
    if(!email || !password) {
    return res.status(401).json({
      message : "email aur password daal lawde"
    });
  }

  try {
    const result = await db.select().from(users).where(eq(users.email, email));

    if (result.length === 0) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const user = result[0];
    

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" },
    );

    return res.status(200).json({
      message: "login successful",
      token,
      user
    });
    
  } catch (error) {
    return res.status(500).json({
      message: "error while Login",
      error: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  const userId = req.user.userId;

  try {
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
      message: "Error fetching profile",
    });
  }
};
