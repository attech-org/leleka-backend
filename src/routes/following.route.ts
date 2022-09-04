import express, { Request, Response } from "express";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import {
  getFollowing,
  addFollowing,
  deleteFollowing,
} from "../services/following.service";

const followingRouter = express.Router();

followingRouter
  .route("/")
  .get(isAuthorized, async (req: Request, res: Response) => {
    const result = await getFollowing(req.query);
    res.send(result);
  });

followingRouter
  .route("/")
  .post(isAuthorized, async (req: Request, res: Response) => {
    await addFollowing(req.body);
    res.sendStatus(200);
  });

followingRouter
  .route("/:followingId")
  .delete(isAuthorized, async (req: Request, res: Response) => {
    await deleteFollowing(req.params.followingId);
    res.sendStatus(200);
  });

export default followingRouter;
