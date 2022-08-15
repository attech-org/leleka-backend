import { generateJWT } from "../config/jwt";
import { User } from "../models/User";
import { addUserData } from "../repositories/user.repository";

export const register = async (data: User) => {
  // process input data
  // call repository method
  const userInDataBase: User = await addUserData(data);
  const token = generateJWT(userInDataBase);
  return { user: userInDataBase, token: token };
};
