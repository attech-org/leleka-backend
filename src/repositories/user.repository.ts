import { User, UserModel } from "../models/User";

export const getAdminUser = () => {
  return UserModel.find({
    username: "admin",
  });
};

export const findUserByUserName = async (username: string) => {
  return UserModel.findOne({ userName: username });
};

export const addUserData = async (user: User) => {
  try {
    if (user && user.username) {
      const dbUser = new UserModel(user);
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

export const findUserData = async (user: User) => {
  try {
    if (user && user.username) {
      const dbUser = new UserModel(user);
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

export default UserModel;
