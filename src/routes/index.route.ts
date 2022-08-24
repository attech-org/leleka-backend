import express, { Request, Response } from "express";

import authRoutes from "./auth.route";
import { tweetsRouter } from "./tweets.route";

const router = express.Router();

router.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});
router.post("/ping", (req: Request, res: Response) => {
  res.send({ ...req.body, processed: true });
});

router.use("/auth", authRoutes);
router.use("/tweets", tweetsRouter);
// router.use("/users", usersRoutes); ...

export default router;
