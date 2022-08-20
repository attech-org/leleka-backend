import UserTokenModel, { UserToken } from "../models/UserToken.models";

export const saveToken = async (userToken: UserToken) => {
  const userTokenModel = await new UserTokenModel(userToken).save();
  return userTokenModel;
};

export const getToken = async (refreshToken: string) => {
  const tokenModel = await UserTokenModel.findOne({ token: refreshToken });
  return tokenModel;
};
