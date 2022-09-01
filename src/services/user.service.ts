import { User } from "../models/User.model";
import {
  create,
  deleteOne,
  getList,
  getUserById,
  updateLocalTokens,
  updateOne,
} from "../repositories/user.repository";

export const listUsers = (query: object) => {
  return getList(query);
};

export const getUser = (id: string) => {
  return getUserById(id);
};

export const getUserLocalTokens = async (id: string) => {
  const result = await getUserById(
    id,
    "+auth.local.refreshToken +auth.local.accessToken" +
      " +auth.twitter.accessToken +auth.twitter.refreshToken"
  );
  if (result) {
    return {
      id: result.id,
      accessToken: result.auth.local.accessToken,
      refreshToken: result.auth.local.refreshToken,
    };
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

export const updateUserLocalTokens = (
  id: string,
  accessToken: string,
  refreshToken: string
) => updateLocalTokens(id, accessToken, refreshToken);
