import { PaginationParameters } from "mongoose-paginate-v2";

import {
  addOne,
  deleteById,
  listBookmarks,
} from "../repositories/bookmarks.repository";

export const getBookmarks = async (
  data: PaginationParameters<never, never>
) => {
  const bookmarksList = await listBookmarks(...data.get());
  return bookmarksList;
};

export const addBookmark = async (owner: string, tweet: string) => {
  if (!owner || !tweet) {
    throw new Error("owner and tweet are required");
  } else {
    return addOne(owner, tweet);
  }
};

export const deleteBookmark = (id: string) => {
  return deleteById(id);
};
