import { ObjectId } from "mongoose";

import { Tag, TagModel } from "../models/Tag.model";

export const getById = async (tagId: string | ObjectId) => {
  return TagModel.findById(tagId);
};

export const create = async (tagData: Partial<Tag>) => {
  return TagModel.create(tagData);
};

export const getList = async () => {
  return TagModel.find();
};

export const update = async (
  tagId: string | ObjectId,
  newTagData: Partial<Tag>
) => {
  return TagModel.findByIdAndUpdate(
    tagId,
    { ...newTagData, updatedAt: new Date().toISOString() },
    { new: true }
  );
};

export const deleteById = async (tagId: string | ObjectId) => {
  return TagModel.findByIdAndDelete(tagId);
};
