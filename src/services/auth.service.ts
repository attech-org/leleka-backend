import { generateJWT } from "../config/jwt";
import { User } from "../models/User";
import { createUser, findUser } from "../repositories/user.repository";

export const register = async (data: User) => {
  // process input data
  // call repository method
  const userInDataBase: User = await createUser(data);
  const token = generateJWT(userInDataBase);
  return { user: userInDataBase, accessToken: token };
};

export const login = async (data: User) => {
  // process input data
  // call repository method
  const userInDataBase: User = await findUser(data);
  const token = generateJWT(userInDataBase);
  return { user: userInDataBase, accessToken: token };
};
