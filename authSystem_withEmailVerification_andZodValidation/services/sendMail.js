import { transporter } from "../configs/nodemailer.config.js";

export const sendMail = async (email , otp) =>{
    await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Verify your account",
        text: `Your OTP is ${otp}. It expires in 10 minutes.`
    });
}