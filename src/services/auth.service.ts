import { generateJWT } from "../config/jwt";
import { comparePassword } from "../helpers/password";
import { User, UserModel } from "../models/User";
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
    const userWithPassword = await UserModel.findOne({
      username: username,
    }).select("password");
    if (userWithPassword) {
      if (!comparePassword(userWithPassword.password, password)) {
        throw new Error("Wrong password");
      } else {
        const userInDataBase: User = await findUser(data);
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
