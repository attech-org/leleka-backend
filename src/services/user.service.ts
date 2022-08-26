import { UserLeleka } from "../models/UserLeleka";
import {
  create,
  deleteOne,
  getList,
  getUserById,
  updateOne,
} from "../repositories/user.repository";

export const listUsers = async () => {
  try {
    const result = await getList();
    if (result) {
      return result;
    }
  } catch (error) {
    throw new Error("Error");
  }
};

export const getUser = async (id: string) => {
  try {
    const result = await getUserById(id);
    if (result) {
      return result;
    }
  } catch (error) {
    throw new Error("Error");
  }
};

export const createUser = async (data: UserLeleka) => {
  try {
    return await create(data);
  } catch (error) {
    throw new Error("Error");
  }
};

export const deleteUser = async (id: string) => {
  try {
    await deleteOne(id);
  } catch (error) {
    throw new Error("Error");
  }
};

export const updateUser = async (id: string, data: UserLeleka) => {
  try {
    const result = await updateOne(id, data);
    if (result) {
      return result;
    }
  } catch (error) {
    throw new Error("Error");
  }
};
