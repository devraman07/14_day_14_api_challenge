import { db } from "../configs/db.js";
import { users } from "../configs/schemas/user.js";
import { uploadTocloudinary } from "../services/uploadToCloud.js";
import bcrypt from "bcrypt";

export const signupController = async (req, res) => {
  const { name, email, password } = req.body;
  

  try {

    let imageUrl = null;

    if (req.file) {
      imageUrl = await uploadTocloudinary(req.file.buffer);
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedpassword,
        profileImage: imageUrl
      })
      .returning();

    return res.status(201).json({
      message: "User created successfully",
      user: user[0],
      profileImage : imageUrl,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};