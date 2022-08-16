import { comparePassword, hashPassword } from "../helpers/password";
import { User, UserModel } from "../models/User";

export const getAdminUser = () => {
  return UserModel.find({
    username: "admin",
  });
};

export const findUserByUserName = async (username: string) => {
  return UserModel.findOne({ username: username });
};

export const addUserData = async (user: User) => {
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

export const findUserData = async (user: User) => {
  const { username, password } = user;
  if (user && username && password) {
    const userInDatabase = await findUserByUserName(username);
    if (!userInDatabase) {
      throw new Error("Login / password combination is incorrect");
    }
    if (!comparePassword(userInDatabase.password, password)) {
      throw new Error("Password is incorrect");
    }
    return userInDatabase;
  } else {
    throw new Error("Smth is wrong");
  }

  // } catch (error) {
  //   if (
  //     error.code === 11000 &&
  //     error.message.includes("duplicate key error collection")
  //   ) {
  //     const key: string = Object.keys(error.keyPattern)[0];
  //     switch (key) {
  //       case "username":
  //         throw new Error(
  //           "Error! A user with the same username already exists"
  //         );
  //       case "email":
  //         throw new Error("Error! A user with the same email already exists");
  //       default:
  //         throw error;
  //     }
  //   } else {
  //     throw error;
  //   }
  // }
};

export default UserModel;
