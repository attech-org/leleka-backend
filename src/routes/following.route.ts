import express, { Request, Response } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";

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
    const result = await getFollowing(new PaginationParameters(req));
    res.send(result);
  });

followingRouter
  .route("/")
  .post(isAuthorized, async (req: Request, res: Response) => {
    const result = await addFollowing(req.body);
    res.status(201).send(result);
  });

followingRouter
  .route("/:followingId")
  .delete(isAuthorized, async (req: Request, res: Response) => {
    await deleteFollowing(req.params.followingId);
    res.sendStatus(200);
  });

export default followingRouter;
