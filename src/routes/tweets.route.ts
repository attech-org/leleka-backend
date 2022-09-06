import express, { Request, Response } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import * as tweetsService from "../services/tweets.service";

const tweetsRoutes = express.Router();
tweetsRoutes.route("/:id").get(async (req: Request, res: Response) => {
  const tweet = await tweetsService.getTweetById(req.params.id);
  res.send(tweet);
});

tweetsRoutes.route("/").get(async (req: Request, res: Response) => {
  const tweets = await tweetsService.getAllTweets(
    new PaginationParameters(req)
  );
  res.send(tweets);
});

tweetsRoutes.delete("/:id", async (req: Request, res: Response) => {
  await tweetsService.deleteTweet(req.params.id);
  res.sendStatus(200);
});

tweetsRoutes
  .route("/")
  .post(isAuthorized, async (req: Request, res: Response) => {
    const newTweet = await tweetsService.createTweet(
      req.body.user._id,
      req.body.content,
      req.body.repliedTo
    );
    res.status(201).send(newTweet);
  });

tweetsRoutes
  .route("/:id")
  .put(isAuthorized, async (req: Request, res: Response) => {
    const modifyTweet = await tweetsService.updateTweet(req.params.id, {
      author: req.body.user._id,
      content: req.body.content,
      repliedTo: req.body.repliedTo,
      updatedAt: new Date().toISOString(),
    });
    res.status(200).send(modifyTweet);
  });

export default tweetsRoutes;
