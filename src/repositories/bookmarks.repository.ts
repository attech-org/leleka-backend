import { ObjectId } from "mongodb";

import { BookmarkModel } from "../models/Bookmark";

export const listBookmarks = async () => {
  const result = await BookmarkModel.find();
  return result;
};

export const addOne = async (tweetId: string, ownerId: string) => {
  const result = new BookmarkModel({
    tweetId: new ObjectId(tweetId),
    ownerId: new ObjectId(ownerId),
  });
  return result.save();
};

export const deleteOne = async (id: string) => {
  const result = await BookmarkModel.deleteOne({ _id: new ObjectId(id) });
  return result;
};

export default BookmarkModel;
