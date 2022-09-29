import { Request } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";

import {
  addOne,
  deleteById,
  deleteByTweetAndOwner,
  listBookmarks,
} from "../repositories/bookmarks.repository";

export const getBookmarks = (req: Request) => {
  const [query, options] = new PaginationParameters({ query: req.query }).get();
  return listBookmarks({ ...query, owner: req.user._id }, options);
};

export const addBookmark = (owner: string, tweet: string) => {
  if (!owner || !tweet) {
    throw new Error("owner and tweet are required");
  } else {
    return addOne(owner, tweet);
  }
};

export const deleteBookmark = (id: string, owner: string) => {
  return deleteById(id, owner);
};

export const deleteBookmarkByTweetAndOwner = (tweet: string, owner: string) => {
  return deleteByTweetAndOwner(tweet, owner);
};
