import express from "express";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import { validation } from "../middlewares/yup.middlewares";
import {
  addFollower,
  deleteFollower,
  getFollowers,
} from "../services/followers.service";
import {
  getFollowersList,
  postFollower,
  deleteFollowerById,
} from "./../validations/follower.validation";

const followersRouter = express.Router();

followersRouter
  .route("/")
  .get(isAuthorized, validation(getFollowersList), async (req, res) => {
    const result = await getFollowers(req);
    res.send(result);
  });

followersRouter
  .route("/")
  .post(isAuthorized, validation(postFollower), async (req, res) => {
    const { follower, following } = req.body;
    const newFollower = await addFollower(follower, following);
    res.status(201).send(newFollower);
  });

followersRouter
  .route("/:id")
  .delete(isAuthorized, validation(deleteFollowerById), async (req, res) => {
    await deleteFollower(req.params.id);
    res.sendStatus(200);
  });

export default followersRouter;
