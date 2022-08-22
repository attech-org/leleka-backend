import { generateJWT } from "../config/jwt";
import { comparePassword } from "../helpers/password";
import { User } from "../models/User";
import { addAccessToken } from "../repositories/auth.repository";
import { createUser, findUser } from "../repositories/user.repository";
import { AccessToken } from "./../models/AccessToken";

export const accessToken = async (access_token: AccessToken) => {
  const result = await addAccessToken(access_token);
  return result;
};
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
  const { username, password } = data;
  if (username && password) {
    const userInDataBase: User = await findUser(data, true);
    if (userInDataBase) {
      if (!comparePassword(userInDataBase.password, password)) {
        throw new Error("Wrong password");
      } else {
        const token = generateJWT(userInDataBase);
        return { user: userInDataBase, accessToken: token };
      }
    } else {
      throw new Error("Can't find such user");
    }
  } else {
    throw new Error("Username or password missing");
  }
};
