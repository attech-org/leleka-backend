import { Bookmark } from "src/models/Bookmark";
import { listBookmarks } from "src/repositories/bookmarks.repository";

export const getBookmarks = async () => {
  const bookmarksList: Bookmark[] = await listBookmarks();

  return bookmarksList;
};
