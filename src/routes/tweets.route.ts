import express, { Request, Response } from "express";

import * as tweetsService from "../services/tweets.service";

const tweetsRouter = express.Router();
tweetsRouter.get("/:id", async (req: Request, res: Response) => {
  const tweet = await tweetsService.getTweetById(req.params.id);
  res.send(tweet);
});

tweetsRouter.get("/", async (req: Request, res: Response) => {
  const tweets = await tweetsService.getAllTweets();
  res.send(tweets);
});

tweetsRouter.delete("/:id", async (req: Request, res: Response) => {
  await tweetsService.deleteTweet(req.params.id);
  res.sendStatus(200);
});

tweetsRouter.post("/", async (req: Request, res: Response) => {
  if (req.body.authorId) {
    await tweetsService.createTweet(
      req.body.authorId,
      req.body.content,
      req.body.repliedTo
    );
    res.sendStatus(201);
  } else {
    res.status(400).send({ error: "Missing authorId" });
  }
});

tweetsRouter.put("/:id", async (req: Request, res: Response) => {
  await tweetsService.updateTweet(req.params.id, {
    authorId: req.body.authorId,
    content: req.body.content,
    repliedTo: req.body.repliedTo,
    updatedAt: new Date().toISOString(),
  });
  res.sendStatus(200);
});

export default tweetsRouter;
