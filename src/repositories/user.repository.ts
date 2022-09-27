import { hashPassword } from "../helpers/password";
import { User, UserModel } from "../models/User.model";

export const getList = (query: object, options: object) => {
  return UserModel.paginate(query, { ...options });
};

export const getUserById = async (id: string, additionalFields?: string) => {
  if (additionalFields) {
    const result = await UserModel.findById(id, additionalFields);
    return result;
  }
  const result = await UserModel.findById(id);
  return result;
};

export const deleteOne = (id: string) => {
  return UserModel.findByIdAndDelete({ _id: id });
};

export const updateLocalTokens = (
  id: string,
  accessToken: string,
  refreshToken: string
) => {
  return UserModel.updateOne(
    { _id: id },
    {
      $set: {
        updatedAt: new Date().toISOString(),
        "auth.local": { accessToken: accessToken, refreshToken: refreshToken },
      },
    }
  );
};

export const updateOne = async (
  id: string,
  data: User,
  file: Express.Multer.File
) => {
  await UserModel.updateOne(
    { _id: id },
    {
      ...data,
      updatedAt: new Date().toISOString(),
      password: data.password && hashPassword(data.password),
      profile: (data.profile || file) && {
        ...data.profile,
        avatar:
          file && `data:image/png;base64,${file?.buffer.toString("base64")}`,
      },
    }
  );
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

export const findUserByUsername = async (
  username: string,
  additionalFields: string
) => {
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

export const changeStatsById = (
  id: string,
  fieldName: string,
  value: number
) => {
  return UserModel.updateOne({ _id: id }, { $inc: { [fieldName]: value } });
};

export default UserModel;
