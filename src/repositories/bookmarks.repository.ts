import { BookmarkModel } from "src/models/Bookmark";

export const listBookmarks = async () => {
  const result = await BookmarkModel.find();
  return result;
};

export default BookmarkModel;
