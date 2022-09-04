import express, { Request, Response } from "express";

import { followersSchema } from "../helpers/validation";
import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import { validation } from "../middlewares/yup.middlewares";
import {
  addFollower,
  deleteFollower,
  getFollowers,
} from "../services/followers.service";

const followersRouter = express.Router();

followersRouter
  .route("/")
  .get(isAuthorized, async (req: Request, res: Response) => {
    const result = await getFollowers(req.query);
    res.send(result);
  });

followersRouter
  .route("/")
  .post(
    isAuthorized,
    validation(followersSchema),
    async (req: Request, res: Response) => {
      const { followerId, ownerId } = req.body;
      await addFollower(followerId, ownerId);
      res.sendStatus(200);
    }
  );

followersRouter
  .route("/:id")
  .delete(isAuthorized, async (req: Request, res: Response) => {
    await deleteFollower(req.params.id);
    res.sendStatus(200);
  });

export default followersRouter;
