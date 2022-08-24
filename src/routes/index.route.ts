import express, { Request, Response } from "express";

import authRoutes from "./auth.route";
import bookmarksRoutes from "./bookmarks.route";

const router = express.Router();

router.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});
router.post("/ping", (req: Request, res: Response) => {
  res.send({ ...req.body, processed: true });
});

router.use("/auth", authRoutes);
router.use("/bookmarks", bookmarksRoutes);
// router.use("/users", usersRoutes); ...

export default router;
