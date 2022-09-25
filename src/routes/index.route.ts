import express from "express";
import swaggerUi from "swagger-ui-express";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import swaggerDocument from "../swagger.json";
import authRoutes from "./auth.route";
import bookmarksRoutes from "./bookmarks.route";
import followersRoutes from "./followers.route";
import likesRoutes from "./likes.route";
import proxyLinkPreviewRouter from "./proxyLinkPreview.route";
import tagsRoutes from "./tags.route";
import tweetsRoutes from "./tweets.route";
import usersRoutes from "./users.route";

const router = express.Router();

router.get("/ping", (_req, res) => {
  res.send("pong");
});
router.post("/ping", (req, res) => {
  res.send({ ...req.body, processed: true });
});

router.get("/testAuthorized", isAuthorized, (_req, res) => {
  res.send("You Authorized");
});

router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(swaggerDocument));

router.use("/auth", authRoutes);
router.use("/bookmarks", bookmarksRoutes);
router.use("/tweets", tweetsRoutes);
router.use("/users", usersRoutes);
router.use("/link-preview", proxyLinkPreviewRouter);
router.use("/likes", likesRoutes);
router.use("/followers", followersRoutes);
router.use("/tags", tagsRoutes);

export default router;
