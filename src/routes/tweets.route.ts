import express from "express";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import * as tweetsService from "../services/tweets.service";

const tweetsRoutes = express.Router();

tweetsRoutes.route("/").get(async (req, res) => {
  const tweets = await tweetsService.getAllTweets(req);
  res.send(tweets);
});

tweetsRoutes.route("/my").get(isAuthorized, async (req, res) => {
  const tweets = await tweetsService.getAllTweetsOfCurrentUser(req);
  res.send(tweets);
});

tweetsRoutes.route("/:id").get(async (req, res) => {
  const tweet = await tweetsService.getTweetById(req.params.id);
  res.send(tweet);
});

tweetsRoutes.route("/").post(isAuthorized, async (req, res) => {
  const newTweet = await tweetsService.createTweet(
    req.user._id,
    req.body.content,
    req.body.repliedTo
  );
  res.status(201).send(newTweet);
});

tweetsRoutes.route("/:id").put(isAuthorized, async (req, res) => {
  const modifyTweet = await tweetsService.updateTweet(req.params.id, {
    author: req.user._id,
    content: req.body.content,
    repliedTo: req.body.repliedTo,
    updatedAt: new Date().toISOString(),
  });
  res.status(200).send(modifyTweet);
});

tweetsRoutes.route("/:id").delete(isAuthorized, async (req, res) => {
  const result = await tweetsService.deleteTweet(req.params.id, req.user._id);
  res.status(200).send(result);
});

export default tweetsRoutes;
