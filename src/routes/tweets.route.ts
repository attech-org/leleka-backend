import express from "express";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import * as tweetsService from "../services/tweets.service";
import { validation } from "./../middlewares/yup.middlewares";
import {
  deleteTweet,
  getMyTweets,
  getTweetById,
  getTweets,
  putTweet,
  postTweet,
} from "./../validations/tweet.validation";

const tweetsRoutes = express.Router();

tweetsRoutes
  .route("/")
  .get(isAuthorized, validation(getTweets), async (req, res) => {
    const tweets = await tweetsService.getAllTweets(req);
    res.send(tweets);
  });

tweetsRoutes
  .route("/my")
  .get(isAuthorized, validation(getMyTweets), async (req, res) => {
    const tweets = await tweetsService.getAllTweetsOfCurrentUser(req);
    res.send(tweets);
  });

tweetsRoutes
  .route("/:id")
  .get(isAuthorized, validation(getTweetById), async (req, res) => {
    const tweet = await tweetsService.getTweetById(req.params.id, req.user._id);
    res.send(tweet);
  });

tweetsRoutes
  .route("/")
  .post(isAuthorized, validation(postTweet), async (req, res) => {
    const newTweet = await tweetsService.createTweet(
      req.user._id,
      req.body.content,
      req.body.repliedTo
    );
    res.status(201).send(newTweet);
  });

tweetsRoutes
  .route("/:id")
  .put(isAuthorized, validation(putTweet), async (req, res) => {
    const modifyTweet = await tweetsService.updateTweet(req.params.id, {
      author: req.user._id,
      content: req.body.content,
      repliedTo: req.body.repliedTo,
      updatedAt: new Date().toISOString(),
    });
    res.status(200).send(modifyTweet);
  });

tweetsRoutes
  .route("/:id")
  .delete(isAuthorized, validation(deleteTweet), async (req, res) => {
    const result = await tweetsService.deleteTweet(req.params.id, req.user._id);
    res.status(200).send(result);
  });

export default tweetsRoutes;
