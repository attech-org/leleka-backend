import express, { Request, Response } from "express";

import { isAuthorised } from "../middlewares/isAuthorised.middlewares";
import authRoutes from "./auth.route";

const router = express.Router();

router.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});
router.post("/ping", (req: Request, res: Response) => {
  res.send({ ...req.body, processed: true });
});

router.get("/testAuthorized", isAuthorised, (_req: Request, res: Response) => {
  res.send("You Authorized");
});

router.use("/auth", authRoutes);
// router.use("/users", usersRoutes); ...

export default router;
