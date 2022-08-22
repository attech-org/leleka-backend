import bcrypt from "bcryptjs";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export const hashPassword = (password: string) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePassword = (hashedPassword: string, password: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};
