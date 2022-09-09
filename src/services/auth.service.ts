import { generateJWT, updateAccessToken } from "../config/jwt";
import { comparePassword } from "../helpers/password";
import { User } from "../models/User.model";
import { create, findUserByUsername } from "../repositories/user.repository";

export const register = async (data: User) => {
  // process input data
  // call repository method
  const userInDataBase = await create(data);
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
  const { password } = data;

  const userInDataBase: User = await findUserByUsername(
    data.username,
    "+password"
  );
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
};

export const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken: string = await updateAccessToken(refreshToken);
  return { accessToken: newAccessToken };
};
