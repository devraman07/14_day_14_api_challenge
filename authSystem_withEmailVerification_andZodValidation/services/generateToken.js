import jwt from 'jsonwebtoken';

export const generateToken = () => {
  return   jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "30m",
        });
}