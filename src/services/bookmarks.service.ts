import { Request } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";

import {
  addOne,
  deleteById,
  listBookmarks,
} from "../repositories/bookmarks.repository";

export const getBookmarks = (req: Request) => {
  const [query, options] = new PaginationParameters(req).get();
  return listBookmarks(query, options);
};

export const addBookmark = (owner: string, tweet: string) => {
  if (!owner || !tweet) {
    throw new Error("owner and tweet are required");
  } else {
    return addOne(owner, tweet);
  }
};

export const deleteBookmark = (id: string) => {
  return deleteById(id);
};
