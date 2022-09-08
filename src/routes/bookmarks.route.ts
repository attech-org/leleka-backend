import express from "express";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import {
  addBookmark,
  deleteBookmark,
  getBookmarks,
} from "../services/bookmarks.service";

const bookmarksRouter = express.Router();

bookmarksRouter.route("/").get(isAuthorized, async (req, res) => {
  const result = await getBookmarks(req);
  res.send(result);
});

bookmarksRouter.route("/").post(isAuthorized, async (req, res) => {
  const { tweet, owner } = req.body;
  await addBookmark(tweet, owner);
  res.sendStatus(200);
});

bookmarksRouter.route("/:id").delete(isAuthorized, async (req, res) => {
  await deleteBookmark(req.params.id);
  res.sendStatus(200);
});

export default bookmarksRouter;
