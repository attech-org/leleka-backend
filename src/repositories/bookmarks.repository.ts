import { BookmarkModel } from "../models/Bookmark.model";

export const listBookmarks = () => {
  return BookmarkModel.find();
};

export const addOne = (tweetId: string, ownerId: string) => {
  const result = new BookmarkModel({
    tweetId: tweetId,
    ownerId: ownerId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return result.save();
};

export const deleteById = (id: string) => {
  return BookmarkModel.deleteOne({ _id: id });
};

export default BookmarkModel;
