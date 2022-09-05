import express, { Request, Response } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";

import * as tweetsService from "../services/tweets.service";

const tweetsRoutes = express.Router();
tweetsRoutes.get("/:id", async (req: Request, res: Response) => {
  const tweet = await tweetsService.getTweetById(req.params.id);
  res.send(tweet);
});

tweetsRoutes.get("/", async (req: Request, res: Response) => {
  const tweets = await tweetsService.getAllTweets(
    new PaginationParameters(req)
  );
  res.send(tweets);
});

tweetsRoutes.delete("/:id", async (req: Request, res: Response) => {
  await tweetsService.deleteTweet(req.params.id);
  res.sendStatus(200);
});

tweetsRoutes.post("/", async (req: Request, res: Response) => {
  if (req.body.author) {
    const newTweet = await tweetsService.createTweet(
      req.body.author,
      req.body.content,
      req.body.repliedTo
    );
    res.status(201).send(newTweet);
  } else {
    res.status(400).send({ error: "Missing author" });
  }
});

tweetsRoutes.put("/:id", async (req: Request, res: Response) => {
  const modifyTweet = await tweetsService.updateTweet(req.params.id, {
    author: req.body.author,
    content: req.body.content,
    repliedTo: req.body.repliedTo,
    updatedAt: new Date().toISOString(),
  });
  res.status(200).send(modifyTweet);
});

export default tweetsRoutes;
