import { ObjectId } from "mongoose";

import { Tag } from "../models/Tag.model";
import {
  create,
  deleteById,
  getList,
  update,
  getById,
} from "../repositories/tags.repository";

export const getTagsList = async (): Promise<Array<Tag>> => {
  return getList();
};

export const getTagById = async (id: string | ObjectId): Promise<Tag> => {
  return getById(id);
};

export const createTag = async (tagData: Partial<Tag>): Promise<Tag> => {
  const createResult = await create(tagData);
  return createResult;
};

export const updateTag = async (
  id: ObjectId | string,
  newData: Partial<Tag>
): Promise<Tag> => {
  return update(id, newData);
};

export const deleteTagById = async (id: ObjectId | string) => {
  await deleteById(id);
  return { succeed: true };
};
