import { eq } from "drizzle-orm";
import { db } from "../configs/db.js";
import { users } from "../schemas/user.js";
import bcrypt from "bcrypt";
import { uploadToCloudinary } from "../services/uploadToCloudinary.js";
import { generateToken } from "../services/generateToken.js";
import { generateOTP } from "../services/generateOtp.js";
import { sendMail } from "../services/sendMail.js";

export const signupcontroller = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageurl = null;

    if (req.file) {
      imageurl = await uploadToCloudinary(req.file.buffer);
    }

    const { otp, otpExpires } = generateOTP();

    const result = await db
      .insert(users)
      .values({
        email,
        name,
        password: hashedPassword,
        profileImage: imageurl,
        otp: otp,
        otpExpires: otpExpires,
      })
      .returning();

    try {
      await sendMail(email, otp);
      console.log("mail sent successfully");
    } catch (mailError) {
      console.log("mail error:", mailError.message);
      r;
    }

    const user = result[0];

    return res.status(201).json({
      message: "user registered successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      message: "Enter Login email and password",
    });
  }

  try {
    const result = await db.select().from(users).where(eq(users.email, email));

    if (result.length > 0) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(403).json({
        message: "Invalid password",
      });
    }

    const token = generateToken();

    return res.status(200).json({
      message: "user login successfull",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
