import express, { Request, Response } from "express";

import { changeLike, getLikeById, updateLike } from "../services/likes.service";

const likesRouter = express.Router();

likesRouter.post("/", async (req: Request, res: Response) => {
  const result = await changeLike(req.body.tweetId, req.body.userId);
  res.status(200).send(result);
});

likesRouter.get("/:id", async (req: Request, res: Response) => {
  const result = await getLikeById(req.params.id);
  res.status(200).send(result);
});
likesRouter.put("/:id", async (req: Request, res: Response) => {
  const result = await updateLike(req.params.id, {
    tweetId: req.body.tweetId,
    userId: req.body.userId,
  });
  res.status(200).send(result);
});

export default likesRouter;
