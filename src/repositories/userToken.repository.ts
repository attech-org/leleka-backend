import UserTokenModel, { UserToken } from "../models/UserToken.models";

export const saveToken = async (userToken: UserToken) => {
  return new UserTokenModel(userToken).save();
};

export const getToken = async (refreshToken: string) => {
  return UserTokenModel.findOne({ token: refreshToken });
};

export const deleteToken = async (refreshToken: string) => {
  return UserTokenModel.deleteOne({ token: refreshToken });
};

export const getTokenByUserId = async (userId: string) => {
  return UserTokenModel.findOne({ userId: userId });
};
