import express, { Request, Response } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";

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
    const result = await getBookmarks(new PaginationParameters(req));
    res.send(result);
  });

bookmarksRouter
  .route("/")
  .post(isAuthorized, async (req: Request, res: Response) => {
    const { tweet, owner } = req.body;
    await addBookmark(tweet, owner);
    res.sendStatus(200);
  });

bookmarksRouter
  .route("/:id")
  .delete(isAuthorized, async (req: Request, res: Response) => {
    await deleteBookmark(req.params.id);
    res.sendStatus(200);
  });

export default bookmarksRouter;
