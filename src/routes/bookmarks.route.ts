import express from "express";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import { validation } from "../middlewares/yup.middlewares";
import {
  addBookmark,
  deleteBookmark,
  deleteBookmarkByTweetAndOwner,
  getBookmarks,
} from "../services/bookmarks.service";
import {
  getBookmarkList,
  postBookmark,
  deleteBookmarkById,
  deleteBookmarkByTweetAndOwnerValidation,
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
  .route("/")
  .delete(
    isAuthorized,
    validation(deleteBookmarkByTweetAndOwnerValidation),
    async (req, res) => {
      const { tweet } = req.body;
      await deleteBookmarkByTweetAndOwner(tweet, req.user._id);
      console.log(tweet);
      console.log(req.user._id);
      res.sendStatus(200);
    }
  );
bookmarksRouter
  .route("/:id")
  .delete(isAuthorized, validation(deleteBookmarkById), async (req, res) => {
    await deleteBookmark(req.params.id, req.user._id);
    res.sendStatus(200);
  });

export default bookmarksRouter;
