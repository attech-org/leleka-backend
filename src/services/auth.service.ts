import { generateJWT } from "../config/jwt";
import { comparePassword } from "../helpers/password";
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
