import express from "express";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import { validation } from "../middlewares/yup.middlewares";
import {
  addBookmark,
  deleteBookmark,
  getBookmarks,
} from "../services/bookmarks.service";
import {
  getBookmarkList,
  postBookmark,
  deleteBookmarkById,
} from "../validations/bookmark.validation";

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
    const { tweet } = req.body;
    const newBookmarks = await addBookmark(tweet, req.user._id);
    return res.status(201).send(newBookmarks);
  });

bookmarksRouter
  .route("/:id")
  .delete(isAuthorized, validation(deleteBookmarkById), async (req, res) => {
    await deleteBookmark(req.params.id, req.user._id);
    res.sendStatus(200);
  });

export default bookmarksRouter;
