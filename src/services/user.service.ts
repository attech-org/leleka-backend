import { User } from "../models/User.model";
import {
  create,
  deleteOne,
  findUserByUsername,
  getList,
  getUserById,
  updateOne,
} from "../repositories/user.repository";

export const listUsers = async () => {
  const result = await getList();
  if (result) {
    return result;
  }
};

export const getUser = async (id: string) => {
  const result = await getUserById(id);
  if (result) {
    return result;
  }
};

export const getUserTokens = async (username: string) => {
  const result = await findUserByUsername(
    username,
    "+auth.local.refreshToken +auth.local.accessToken"
  );
  if (result) {
    return result;
  }
};

export const createUser = async (data: User) => {
  const result = await create(data);
  return result;
};

export const deleteUser = async (id: string) => {
  await deleteOne(id);
};

export const updateUser = async (id: string, data: User) => {
  const result = await updateOne(id, data);
  if (result) {
    return result;
  }
};
