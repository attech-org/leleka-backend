import { generateJWT, updateAccessToken } from "../config/jwt";
import { comparePassword } from "../helpers/password";
import { User } from "../models/User.model";
import { createUser, findUser } from "../repositories/user.repository";

export const register = async (data: User) => {
  // process input data
  // call repository method
  const userInDataBase: User = await createUser(data);
  const tokens = await generateJWT(userInDataBase);
  return {
    user: userInDataBase,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
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
        const tokens = await generateJWT(userInDataBase);
        return {
          user: userInDataBase,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        };
      }
    } else {
      throw new Error("Can't find such user");
    }
  } else {
    throw new Error("Username or password missing");
  }
};

export const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken: string = await updateAccessToken(refreshToken);
  return { accessToken: newAccessToken };
};
