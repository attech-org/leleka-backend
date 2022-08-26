import { Bookmark } from "../models/Bookmark.model";
import {
  addOne,
  deleteById,
  listBookmarks,
} from "../repositories/bookmarks.repository";

export const getBookmarks = async () => {
  const bookmarksList: Bookmark[] = await listBookmarks();
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
