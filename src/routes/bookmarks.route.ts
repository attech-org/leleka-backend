import express from "express";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import {
  addBookmark,
  deleteBookmark,
  getBookmarks,
} from "../services/bookmarks.service";
import { validation } from "./../middlewares/yup.middlewares";
import {
  getBookmarkList,
  postBookmark,
  deleteBookmarkById,
} from "./../validations/bookmark.validation";

const bookmarksRouter = express.Router();

bookmarksRouter
  .route("/")
  .get(isAuthorized, validation(getBookmarkList), async (req, res) => {
    const result = await getBookmarks(req);
    res.send(result);
  });

bookmarksRouter
  .route("/")
  .post(isAuthorized, validation(postBookmark), async (req, res) => {
    const { tweet, owner } = req.body;
    const newBookmarks = await addBookmark(tweet, owner);
    return res.status(201).send(newBookmarks);
  });

bookmarksRouter
  .route("/:id")
  .delete(isAuthorized, validation(deleteBookmarkById), async (req, res) => {
    await deleteBookmark(req.params.id);
    res.sendStatus(200);
  });

export default bookmarksRouter;
