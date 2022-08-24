// eslint-disable-next-line import/order
import express, { Request, Response } from "express";

import * as repo from "../repositories/tweet.repository";

export const tweetsRouter = express.Router();
const inputErrorMessage = "Input error";
tweetsRouter.get("/getOne/:id", async (req: Request, res: Response) => {
  try {
    const tweet = await repo.getTweetById(req.params.id);
    res.json(tweet);
  } catch (error) {
    if (error.message.includes(inputErrorMessage)) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

tweetsRouter.get("/getAll", async (req: Request, res: Response) => {
  try {
    const tweets = await repo.getAllTweets();
    res.json(tweets);
  } catch (error) {
    if (error.message.includes(inputErrorMessage)) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

tweetsRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    await repo.deleteTweet(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    if (error.message.includes(inputErrorMessage)) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

tweetsRouter.post("/create", async (req: Request, res: Response) => {
  try {
    if (req.body.authorId) {
      await repo.createTweet(
        req.body.authorId,
        req.body.content,
        req.body.repliedTo
      );
      res.sendStatus(201);
    } else {
      res.status(400).json({ error: "Missing authorId" });
    }
  } catch (error) {
    if (error.message.includes(inputErrorMessage)) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

tweetsRouter.put("/update/:id", async (req: Request, res: Response) => {
  try {
    await repo.updateTweet(req.params.id, {
      authorId: req.body.authorId,
      content: req.body.content,
      repliedTo: req.body.repliedTo,
      updatedAt: new Date(),
    });
    res.sendStatus(200);
  } catch (error) {
    if (error.message.includes(inputErrorMessage)) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});
