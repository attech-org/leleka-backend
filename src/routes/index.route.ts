import express, { Request, Response } from "express";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import authRoutes from "./auth.route";
import bookmarksRoutes from "./bookmarks.route";
import followersRoutes from "./followers.route";
import likesRoutes from "./likes.route";
import proxyLinkPreviewRouter from "./proxyLinkPreview.route";
import tweetsRoutes from "./tweets.route";
import usersRoutes from "./users.route";

const router = express.Router();

router.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});
router.post("/ping", (req: Request, res: Response) => {
  res.send({ ...req.body, processed: true });
});

router.get("/testAuthorized", isAuthorized, (_req: Request, res: Response) => {
  res.send("You Authorized");
});

router.use("/auth", authRoutes);
router.use("/bookmarks", bookmarksRoutes);
router.use("/tweets", tweetsRoutes);
router.use("/users", usersRoutes);
router.use("/link-preview", proxyLinkPreviewRouter);
router.use("/likes", likesRoutes);
router.use("/followers", followersRoutes);

export default router;
