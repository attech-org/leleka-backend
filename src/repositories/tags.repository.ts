import { Tag, TagModel } from "../models/Tag.model";

export const getById = (tagId: string) => {
  return TagModel.findById(tagId);
};

export const create = (tagData: Partial<Tag>) => {
  return TagModel.create(tagData);
};

export const getList = () => {
  return TagModel.find();
};

export const update = (tagId: string, newTagData: Partial<Tag>) => {
  return TagModel.findByIdAndUpdate(
    tagId,
    { ...newTagData, updatedAt: new Date().toISOString() },
    { new: true }
  );
};

export const deleteById = (tagId: string) => {
  return TagModel.findByIdAndDelete(tagId);
};
