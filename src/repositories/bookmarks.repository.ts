import { ObjectId } from "mongodb";

import { BookmarkModel } from "../models/Bookmark";

export const listBookmarks = async () => {
  const result = await BookmarkModel.find();
  return result;
};

export const addOne = async (tweetId: ObjectId, ownerId: ObjectId) => {
  const result = new BookmarkModel({
    tweetId: tweetId,
    ownerId: ownerId,
  });
  return result.save();
};

export const deleteOne = async (id: ObjectId) => {
  const result = await BookmarkModel.deleteOne({ _id: id });
  return result;
};

export default BookmarkModel;
