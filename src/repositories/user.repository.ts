import { hashPassword } from "../helpers/password";
import { User, UserModel } from "../models/User.model";

export const getList = async () => {
  const result = await UserModel.find();
  return result;
};

export const getUserById = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};

export const deleteOne = async (id: string) => {
  const result = await UserModel.findByIdAndDelete({ _id: id });
  return result;
};

export const updateOne = async (id: string, data: User) => {
  if (data.password) {
    const encryptedPassword = hashPassword(data.password);
    await UserModel.updateOne(
      { _id: id },
      {
        ...data,
        updatedAt: new Date().toISOString(),
        password: encryptedPassword,
      }
    );
  } else {
    await UserModel.updateOne(
      { _id: id },
      { ...data, updatedAt: new Date().toISOString() }
    );
  }
  const result = await UserModel.findById({ _id: id });
  return result;
};

export const create = async (user: User) => {
  try {
    const { password } = user;
    const encryptedPassword = hashPassword(password);
    const dbUser = new UserModel({ ...user, password: encryptedPassword });

    const userInDatabase = await dbUser.save();

    return userInDatabase;
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

export const findUser = async (user: User, additionalFields: string) => {
  const { username } = user;
  if (additionalFields) {
    const userInDatabase = await UserModel.findOne(
      {
        username: username,
      },
      additionalFields
    );

    return userInDatabase;
  } else {
    const userInDatabase = await UserModel.findOne({ username: username });
    return userInDatabase;
  }
};

export default UserModel;
