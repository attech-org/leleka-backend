import express from "express";

import { followersSchema } from "../helpers/validation";
import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import { validation } from "../middlewares/yup.middlewares";
import {
  addFollower,
  deleteFollower,
  getFollowers,
} from "../services/followers.service";

const followersRouter = express.Router();

followersRouter.route("/").get(isAuthorized, async (req, res) => {
  const result = await getFollowers(req);
  res.send(result);
});

followersRouter
  .route("/")
  .post(isAuthorized, validation(followersSchema), async (req, res) => {
    const { follower, following } = req.body;
    const newFollower = await addFollower(follower, following);
    res.status(201).send(newFollower);
  });

followersRouter.route("/:id").delete(isAuthorized, async (req, res) => {
  await deleteFollower(req.params.id);
  res.sendStatus(200);
});

export default followersRouter;
