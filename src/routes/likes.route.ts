import express, { Request, Response } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";

import {
  changeLike,
  getLikeById,
  getLikes,
  updateLike,
} from "../services/likes.service";

const likesRoutes = express.Router();

likesRoutes.route("/").get(async (req: Request, res: Response) => {
  const result = await getLikes(new PaginationParameters(req));
  res.send(result);
});

likesRoutes.post("/", async (req: Request, res: Response) => {
  await changeLike(req.body.tweet, req.body.user);
  res.sendStatus(200);
});

likesRoutes.get("/:id", async (req: Request, res: Response) => {
  const result = await getLikeById(req.params.id);
  res.status(200).send(result);
});
likesRoutes.put("/:id", async (req: Request, res: Response) => {
  const result = await updateLike(req.params.id, {
    tweet: req.body.tweet,
    user: req.body.user,
  });
  res.status(200).send(result);
});

export default likesRoutes;
