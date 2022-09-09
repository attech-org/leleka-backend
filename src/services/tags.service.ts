import { Request } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";

import { Tag } from "../models/Tag.model";
import {
  create,
  deleteById,
  getList,
  update,
  getById,
} from "../repositories/tags.repository";

export const getTagsList = (req: Request) => {
  const [query, options] = new PaginationParameters(req).get();
  return getList(query, options);
};

export const getTagById = (id: string) => {
  return getById(id);
};

export const createTag = (tagData: Partial<Tag>) => {
  return create(tagData);
};

export const updateTag = (id: string, newData: Partial<Tag>) => {
  return update(id, newData);
};

export const deleteTagById = async (id: string) => {
  await deleteById(id);
  return { succeed: true };
};
