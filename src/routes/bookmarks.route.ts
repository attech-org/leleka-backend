import express, { Request, Response } from "express";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import {
  addBookmark,
  deleteBookmark,
  getBookmarks,
} from "../services/bookmarks.service";

const bookmarksRouter = express.Router();

bookmarksRouter
  .route("/")
  .get(isAuthorized, async (req: Request, res: Response) => {
    const result = await getBookmarks();
    res.send(result);
  });

bookmarksRouter
  .route("/")
  .post(isAuthorized, async (req: Request, res: Response) => {
    const { tweetId, ownerId } = req.body;
    await addBookmark(tweetId, ownerId);
    res.sendStatus(200);
  });

bookmarksRouter
  .route("/:id")
  .delete(isAuthorized, async (req: Request, res: Response) => {
    await deleteBookmark(req.params.id);
    res.sendStatus(200);
  });

export default bookmarksRouter;
