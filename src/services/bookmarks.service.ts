import { ObjectId } from "mongodb";

import { Bookmark } from "../models/Bookmark";
import {
  addOne,
  deleteOne,
  listBookmarks,
} from "../repositories/bookmarks.repository";

export const getBookmarks = async () => {
  const bookmarksList: Bookmark[] = await listBookmarks();
  return bookmarksList;
};

export const addBookmark = async (ownerId: string, tweetId: string) => {
  return addOne(new ObjectId(ownerId), new ObjectId(tweetId));
};

export const deleteBookmark = (id: string) => {
  return deleteOne(new ObjectId(id));
};
