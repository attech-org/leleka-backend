import { User } from "../models/User.model";
import {
  create,
  deleteOne,
  getList,
  getUserById,
  updateLocalToken,
  updateOne,
} from "../repositories/user.repository";

export const listUsers = () => {
  return getList();
};

export const getUser = (id: string) => {
  return getUserById(id);
};

export const getUserTokens = async (id: string) => {
  const result = await getUserById(
    id,
    "+auth.local.refreshToken +auth.local.accessToken" +
      " +auth.twitter.accessToken +auth.twitter.refreshToken"
  );
  if (result) {
    return result;
  }
};

export const createUser = (data: User) => {
  return create(data);
};

export const deleteUser = (id: string) => {
  return deleteOne(id);
};

export const updateUser = (id: string, data: User) => {
  return updateOne(id, data);
};

export const updateUserLocalToken = (
  id: string,
  accessToken: string,
  refreshToken: string
) => updateLocalToken(id, accessToken, refreshToken);
