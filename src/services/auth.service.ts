import { addAccessToken } from "src/repositories/auth.repository";

import { generateJWT } from "../config/jwt";
import { User } from "../models/User";
import { addUserData } from "../repositories/user.repository";
import { AccessToken } from "./../models/AccessToken";

export const accessToken = async (access_token: AccessToken) => {
  const result = await addAccessToken(access_token);
  return result;
};
export const register = async (data: User) => {
  // process input data
  // call repository method
  const userInDataBase: User = await addUserData(data);
  const token = generateJWT(userInDataBase);
  return { user: userInDataBase, token: token };
};
