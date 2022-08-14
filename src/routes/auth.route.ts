import express, { Request, Response } from "express";
import { register } from "../services/auth.service";

const authRouter = express.Router();

authRouter.route("/register").post(async (req: Request, res: Response) => {
  try {
    // process input data
    // call repository method
    const data = req.body;
    const result = await register(data);
    res.send(result);
  } catch (error: any) {
    console.error(error);
    res.sendStatus(400);
  }
});

export default authRouter;
