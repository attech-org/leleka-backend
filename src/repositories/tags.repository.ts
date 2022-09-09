import { Tag, TagModel } from "../models/Tag.model";

export const getById = async (tagId: string) => {
  return TagModel.findById(tagId);
};

export const create = async (tagData: Partial<Tag>) => {
  return TagModel.create(tagData);
};

export const getList = async () => {
  return TagModel.find();
};

export const update = async (tagId: string, newTagData: Partial<Tag>) => {
  return TagModel.findByIdAndUpdate(
    tagId,
    { ...newTagData, updatedAt: new Date().toISOString() },
    { new: true }
  );
};

export const deleteById = async (tagId: string) => {
  return TagModel.findByIdAndDelete(tagId);
};
