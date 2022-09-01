import { hashPassword } from "../helpers/password";
import { User, UserModel } from "../models/User.model";

export const getList = async (queryParams: object) => {
  const query = {};
  const options = {
    ...queryParams,
  };
  const result = await UserModel.paginate(query, options);
  return result;
};

export const getUserById = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};

export const create = async (data: User) => {
  const result = new UserModel({
    username: data.username,
    password: data.password,
    email: data.email,
    name: data.name,
    location: data.location || "",
    url: data.url || "",
    description: data.description || "",
    createdAt: new Date().toISOString(),
  });
  result.save();
  return result;
};

export const deleteOne = async (id: string) => {
  const result = await UserModel.findByIdAndDelete({ _id: id });
  return result;
};

export const updateOne = async (id: string, data: User) => {
  await UserModel.updateOne(
    { _id: id },
    { ...data, updated_at: new Date().toISOString() }
  );
  const result = await UserModel.findById({ _id: id });
  return result;
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
