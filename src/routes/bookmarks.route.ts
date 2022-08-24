import express, { Request, Response } from "express";
import { getBookmarks } from "src/services/bookmarks.service";

const bookmarksRouter = express.Router();

bookmarksRouter.route("/").get(async (req: Request, res: Response) => {
  const result = await getBookmarks();
  res.send(result);
});

export default bookmarksRouter;
