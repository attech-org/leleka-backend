import express from "express";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import { validation } from "../middlewares/yup.middlewares";
import {
  changeLike,
  getLikeById,
  getLikes,
  updateLike,
} from "../services/likes.service";
import {
  getLikesList,
  getLikeByID,
  postLike,
  putLike,
} from "./../validations/like.validation";

const likesRoutes = express.Router();

likesRoutes.route("/").get(validation(getLikesList), async (req, res) => {
  const result = await getLikes(req);
  res.send(result);
});

likesRoutes
  .route("/")
  .post(isAuthorized, validation(postLike), async (req, res) => {
    const newLike = await changeLike(req.body.tweet, req.user._id);
    res.status(201).send(newLike);
  });

likesRoutes.route("/:id").get(validation(getLikeByID), async (req, res) => {
  const result = await getLikeById(req.params.id);
  res.status(200).send(result);
});
likesRoutes
  .route("/:id")
  .put(isAuthorized, validation(putLike), async (req, res) => {
    const result = await updateLike(req.params.id, {
      tweet: req.body.tweet,
      user: req.user._id,
    });
    res.status(200).send(result);
  });

export default likesRoutes;
