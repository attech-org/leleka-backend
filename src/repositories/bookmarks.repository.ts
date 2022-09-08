import { BookmarkModel } from "../models/Bookmark.model";

export const listBookmarks = (query: object, options: object) => {
  return BookmarkModel.paginate(query, options);
};

export const addOne = (tweet: string, owner: string) => {
  const result = new BookmarkModel({
    tweet: tweet,
    owner: owner,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return result.save();
};

export const deleteById = (id: string) => {
  return BookmarkModel.deleteOne({ _id: id });
};

export default BookmarkModel;
