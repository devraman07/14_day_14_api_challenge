import bcrypt from "bcrypt";
export const generateToken = async() => {
    await bcrypt.hash(password, 10);
}