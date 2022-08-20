import { hashPassword } from "../helpers/password";
import { User, UserModel } from "../models/User.model";

export const getAdminUser = () => {
  return UserModel.find({
    username: "admin",
  });
};

export const createUser = async (user: User) => {
  try {
    if (user && user.username) {
      const { password } = user;
      const encryptedPassword = hashPassword(password);
      const dbUser = new UserModel({ ...user, password: encryptedPassword });

      const userInDatabase = await dbUser.save();

      return userInDatabase;
    } else {
      throw new Error("Error: 'username' is absent!!!");
    }
  } catch (error) {
    if (
      error.code === 11000 &&
      error.message.includes("duplicate key error collection")
    ) {
      const key: string = Object.keys(error.keyPattern)[0];
      switch (key) {
        case "username":
          throw new Error(
            "Error! A user with the same username already exists"
          );
        case "email":
          throw new Error("Error! A user with the same email already exists");
        default:
          throw error;
      }
    } else {
      throw error;
    }
  }
};

export const findUser = async (user: User, withPassword?: boolean) => {
  const { username } = user;
  if (withPassword) {
    const userInDatabase = await UserModel.findOne(
      {
        username: username,
      },
      "+password"
    );

    return userInDatabase;
  } else {
    const userInDatabase = await UserModel.findOne({ username: username });
    return userInDatabase;
  }
};

export default UserModel;
