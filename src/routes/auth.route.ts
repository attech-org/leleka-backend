import express from "express";

import { validation } from "../middlewares/yup.middlewares";
import { getNewAccessToken, login, register } from "../services/auth.service";
import { loginUser } from "./../validations/login.validation";
import { registerUser } from "./../validations/register.validation";

const authRouter = express.Router();

// authRouter.route("/twitter").get(
// post request to Twitter API
// receive redirectUri in response
// redirect your user to received redirectUri res.redirect()
// );

// authRouter.route("/twitter_callback").get(
// in query params: "code"
// post request to Twitter API with received "code" and "twitter_client_id", "twitter_client_secret" from .env
// in response you'll have authToken and refreshAuthToken
// save them to DB and send it to user
// );

authRouter
  .route("/register")
  .post(validation(registerUser), async (req, res) => {
    const data = req.body;
    const result = await register(data);
    res.send(result);
  });

authRouter.route("/login").post(validation(loginUser), async (req, res) => {
  const data = req.body;
  const result = await login(data);
  res.send(result);
});

authRouter.route("/refresh").post(async (req, res) => {
  const data = req.body;
  if (!data.refreshToken) {
    throw Error("refreshToken missing at body of request");
  }
  const result = await getNewAccessToken(data.refreshToken);
  res.send(result);
});

export default authRouter;
