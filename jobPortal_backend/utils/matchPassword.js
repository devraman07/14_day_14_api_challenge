import bcrypt from 'bcrypt';

export const comparePassword = async (plainPassword, hashedPPassword) => {
  return  await bcrypt.compare(plainPassword, hashedPPassword);
}