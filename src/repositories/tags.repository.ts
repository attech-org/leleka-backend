import { Tag, TagModel } from "../models/Tag.model";
interface CreateOptions {
  initialIncrementStats?: boolean;
}
export const getById = (tagId: string) => {
  return TagModel.findById(tagId);
};

export const create = (
  tagData: Partial<Tag>,
  createOptions?: CreateOptions
) => {
  if (createOptions) {
    //to be continued
    if (createOptions?.initialIncrementStats) {
      tagData.stats = { tweets: 1 };
    }
  }
  return TagModel.create(tagData);
};

export const getList = (query: object, options: object) => {
  return TagModel.paginate(query, { ...options });
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

export const getByName = (name: string) => {
  return TagModel.findOne({ name: name });
};

export const incrementStatsByName = (name: string, incrementValue = 1) => {
  return TagModel.findOneAndUpdate(
    { name: name },
    { $inc: { "stats.tweets": incrementValue } },
    { new: true }
  );
};
