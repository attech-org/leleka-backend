import express, { Request, Response } from "express";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import { User } from "../models/User.model";
import { changeLike, getLikeById, updateLike } from "../services/likes.service";

const likesRoutes = express.Router();

likesRoutes
  .route("/")
  .post(isAuthorized, async (req: Request, res: Response) => {
    const user = req.user as User;
    await changeLike(req.body.tweet, user._id);
    res.sendStatus(200);
  });

likesRoutes.route("/:id").get(async (req: Request, res: Response) => {
  const result = await getLikeById(req.params.id);
  res.status(200).send(result);
});
likesRoutes
  .route("/:id")
  .put(isAuthorized, async (req: Request, res: Response) => {
    const user = req.user as User;
    const result = await updateLike(req.params.id, {
      tweet: req.body.tweet,
      user: user._id,
    });
    res.status(200).send(result);
  });

export default likesRoutes;
