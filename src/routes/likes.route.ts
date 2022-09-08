import express from "express";

import { likesQuerySchema } from "../helpers/validation";
import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import { validation } from "../middlewares/yup.middlewares";
import {
  changeLike,
  getLikeById,
  getLikes,
  updateLike,
} from "../services/likes.service";

const likesRoutes = express.Router();

likesRoutes.route("/").get(validation(likesQuerySchema), async (req, res) => {
  const result = await getLikes(req);
  res.send(result);
});

likesRoutes.route("/").post(isAuthorized, async (req, res) => {
  await changeLike(req.body.tweet, req.user._id);
  res.sendStatus(200);
});

likesRoutes.route("/:id").get(async (req, res) => {
  const result = await getLikeById(req.params.id);
  res.status(200).send(result);
});
likesRoutes.route("/:id").put(isAuthorized, async (req, res) => {
  const result = await updateLike(req.params.id, {
    tweet: req.body.tweet,
    user: req.user._id,
  });
  res.status(200).send(result);
});

export default likesRoutes;
