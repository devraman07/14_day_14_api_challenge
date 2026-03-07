import jwt from "jsonwebtoken";

export const generateToken = () => {
     jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" },
    );
}