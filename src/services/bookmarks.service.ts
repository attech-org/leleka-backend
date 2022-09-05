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

export const addBookmark = async (ownerId: string, tweetId: string) => {
  if (!ownerId || !tweetId) {
    throw new Error("ownerId and tweetId are required");
  } else {
    return addOne(ownerId, tweetId);
  }
};

export const deleteBookmark = (id: string) => {
  return deleteById(id);
};
