import { BookmarkModel } from "../models/Bookmark.model";

export const listBookmarks = async () => {
  const result = await BookmarkModel.find();
  return result;
};

export const addOne = async (tweetId: string, ownerId: string) => {
  const result = new BookmarkModel({
    tweetId: tweetId,
    ownerId: ownerId,
    createdAt: new Date().toISOString(),
  });
  return result.save();
};

export const deleteById = async (id: string) => {
  const result = await BookmarkModel.deleteOne({ _id: id });
  return result;
};

export default BookmarkModel;
