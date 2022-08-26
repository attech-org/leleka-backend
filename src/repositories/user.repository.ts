import { hashPassword } from "../helpers/password";
import { User, UserModel } from "../models/User";
import { UserLelekaModel, UserLeleka } from "../models/UserLeleka";

export const getList = async () => {
  const result = await UserLelekaModel.find();
  return result;
};

export const getUserById = async (id: string) => {
  const result = await UserLelekaModel.findById(id);
  return result;
};

export const create = async (data: UserLeleka) => {
  const result = new UserLelekaModel({
    name: data.name,
    location: data.location || "",
    url: data.url || "",
    description: data.description || "",
    created_at: new Date(),
  });
  result.save();
};

export const deleteOne = async (id: string) => {
  await UserLelekaModel.deleteOne({ _id: id });
};

export const updateOne = async (id: string, data: UserLeleka) => {
  const user = await UserLelekaModel.findById({ _id: id });
  await user.update({
    name: data.name || user.name,
    location: data.location || user.location,
    url: data.url || user.url,
    description: data.description || user.description,
  });
  return user;
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
