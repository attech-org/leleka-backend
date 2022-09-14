import { Request } from "express";
import { convert } from "html-to-text";
import { PaginationParameters } from "mongoose-paginate-v2";
import TweeterUtils from "twitter-text";

import { Tag } from "../models/Tag.model";
import {
  create,
  deleteById,
  getList,
  update,
  getById,
  incrementStatsByName,
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

export const updateTagsFromContent = (content: string, oldContent?: string) => {
  const hashTags = new Set<string>(
    TweeterUtils.extractHashtags(convert(content))
  );

  if (hashTags) {
    hashTags.forEach(async (name: string) => {
      let result: Tag;
      result = await incrementStatsByName(name);
      if (!result) {
        result = await create({ name: name }, { initialIncrementStats: true });
      }
    });
  }
  //decrementing tags if required
  const tagsFromOldContent =
    oldContent &&
    new Set<string>(TweeterUtils.extractHashtags(convert(oldContent)));

  if (tagsFromOldContent) {
    tagsFromOldContent.forEach(async (tag) => {
      if (!hashTags.has(tag)) {
        await incrementStatsByName(tag, -1);
      }
    });
  }
};
