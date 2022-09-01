import { User } from "../models/User.model";
import {
  create,
  deleteOne,
  getList,
  getUserById,
  updateOne,
} from "../repositories/user.repository";

export const listUsers = async (query: object) => {
  const result = await getList(query);
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
