import express, { Request, Response } from "express";
import { register } from "../services/auth.service";

const authRouter = express.Router();

// authRouter.route("/twitter").get(
  // post request to Twitter API
  // receive redirectUri in response
  // redirect your user to received redirectUri res.redirect()
// );

// authRouter.route("/twitter_callback").get(
  // in query params: "code"
  // post reuqest to Twitter API with received "code" and "twitter_client_id", "twitter_client_secret" from .env 
  // in response you'll have authToken and refreshAuthToken
  // save them to DB and send it to user
// );

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
