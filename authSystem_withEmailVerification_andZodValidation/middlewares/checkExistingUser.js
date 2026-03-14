import { eq } from "drizzle-orm";
import { db } from "../configs/db.js";
import { users } from "../schemas/user.js";

export const checkExistingUser = async (req, res, next) => {
    try {
        const { email } = req.body; 

        if (!email) {
            return res.status(400).json({
                message: "email is required"
            });
        }

        const userExist = await db.select({ id: users.id }).from(users).where(eq(users.email, email));

        if (userExist.length > 0) {
            return res.status(409).json({
                message: "user already exists"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}