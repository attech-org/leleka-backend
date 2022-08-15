import * as jwt from "../config/jwt";
import { User } from "../models/User";
import { addUserData } from "../repositories/user.repository";

export const register = async (data: User) => {
  // process input data
  // call repository method
  const userInDataBase: User = await addUserData(data);
  const token = jwt.generateJWT(userInDataBase);
  return { user: userInDataBase, token: token };
};
