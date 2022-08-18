import { generateJWT } from "../config/jwt";
import { User } from "../models/User";
import { addAccessToken } from "../repositories/auth.repository";
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
