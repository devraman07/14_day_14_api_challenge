import { eq } from "drizzle-orm";
import { db } from "../configs/db";
import { users } from "../schemas/user";
import bcrypt from "bcrypt"

export const signupcontroller = async (req , res) => {
    const {email, name , password} = req.body;


    const existingUser = await db.select({id : users.id}).from(users).where(eq(users.email, email));

    if(existingUser) {
        return res.status(409).json({
            Message : "user already exists",
        })
    }

    try {
         
      

    } catch (error) {
        
    }
}