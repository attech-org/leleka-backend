import { hashPassword } from "../helpers/password";
import { User, UserModel } from "../models/User.model";

export const getList = async () => {
  try {
    const result = await UserModel.find();
    return result;
  } catch (error) {
    throw new Error("Error in the DB");
  }
};

export const getUserById = async (id: string) => {
  try {
    const result = await UserModel.findById(id);
    return result;
  } catch (error) {
    throw new Error("Error in the DB");
  }
};

export const create = async (data: User) => {
  try {
    const result = new UserModel({
      username: data.username,
      password: data.password,
      email: data.email,
      name: data.name,
      location: data.location || "",
      url: data.url || "",
      description: data.description || "",
      created_at: new Date().toISOString(),
      updated_at: null,
    });
    result.save();
    return result;
  } catch (error) {
    throw new Error("Error in the DB");
  }
};

export const deleteOne = async (id: string) => {
  try {
    await UserModel.deleteOne({ _id: id });
  } catch (error) {
    throw new Error("Error in the DB");
  }
};

export const updateOne = async (id: string, data: User) => {
  try {
    await UserModel.updateOne(
      { _id: id },
      { ...data, updated_at: new Date().toISOString() }
    );
    const result = await UserModel.findById({ _id: id });
    return result;
  } catch (error) {
    throw new Error("Error in the DB");
  }
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
