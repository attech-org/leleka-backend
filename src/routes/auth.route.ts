import express, { Request, Response } from "express";

import { loginSchema, registerSchema } from "../helpers/validation";
import { validation } from "../middlewares/yup.middlewares";
import { getNewAccessToken, login, register } from "../services/auth.service";

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

authRouter
  .route("/register")
  .post(validation(registerSchema), async (req: Request, res: Response) => {
    const data = req.body;
    const result = await register(data);
    res.send(result);
  });

authRouter
  .route("/login")
  .post(validation(loginSchema), async (req: Request, res: Response) => {
    const data = req.body;
    const result = await login(data);
    res.send(result);
  });

authRouter.route("/refresh").post(async (req: Request, res: Response) => {
  const data = req.body;
  if (!data.refreshToken) {
    throw Error("refreshToken missing at body of request");
  }
  const result = await getNewAccessToken(data.refreshToken);
  res.send(result);
});

export default authRouter;
