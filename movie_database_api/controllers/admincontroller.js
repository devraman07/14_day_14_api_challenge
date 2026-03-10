import "dotenv/config";
import bcrypt from 'bcrypt';
import { db } from '../configs/db.js';
import { admins } from '../configs/schemas/admin.js';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken'

export const signupController = async(req , res) => {
    const {name , email , password} = req.body;

    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        
        if(hashedpassword.length < 10) {
            return res.json({
                message : "vai thoda bada password daal",
            });
        }

        const admin  = await db.insert(admins).values({
            email : email,
            name : name,
            password : hashedpassword
        }).returning();

        return res.status(201).json({
            message : "admin registered successfully",
            data : admin
        });
        
    } catch (error) {
        return res.status(500).json({
            message : "error while signup",
            error : error.message
        });
    }
}

export const logincontroller = async (req, res) => {
    const {email, password} = req.body;

    try {
        const result = await db.select().from(admins).where(eq(admins.email, email));
        
        if(result.length === 0) {
            return res.json({
                message : "vai tu nahi hai admin",
            })
        }
      
        const admin = result[0]
       

        const match = await bcrypt.compare(password, admin.password)

        if(!match) {
            return res.json({
                message : "invalid pasword",
            })
        }

        const token = await jwt.sign(
            {id : admin.id, role: admin.role},
            process.env.JWT_SECRET,
            {expiresIn : "1h"}
        );
        return res.status(200).json({
            message : "admin logged in successfully",
            token
        })

    } catch (error) {
        return res.status(500).json({
            message : "error while login",
            error : error.message
        });
    }
}