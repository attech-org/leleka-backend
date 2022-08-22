import express, { Request, Response } from "express";
import superagent from "superagent";

import { accessToken, login, register } from "../services/auth.service";

const authRouter = express.Router();

const redirectUri = process.env.REDIRECT_URI;
const twitterClientId = process.env.TWITTER_CLIENT_ID;
const twitterClientSecret = process.env.TWITTER_CLIENT_SECRET;
const state = {};
const codeChallenge = process.env.CODE_CHALLENGE;

authRouter.route("/twitter").get(async (_req: Request, res: Response) => {
  res.redirect(
    `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${twitterClientId}&redirect_uri=${redirectUri}&scope=tweet.read%20users.read%20follows.read%20follows.write&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=plain`
  );
});

authRouter
  .route("/twitter-callback")
  .get(async (req: Request, res: Response) => {
    try {
      const code = req.query.code;
      res.sendStatus(200);
      if (code) {
        const authOptions = {
          code: code,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
          code_verifier: codeChallenge,
        };

        const base64secret = new Buffer(
          `${twitterClientId}:${twitterClientSecret}`
        ).toString("base64");
        const response = await superagent
          .post(process.env.POST_TWITTER_OAUTH2_TOKEN)
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set("Authorization", `Basic ${base64secret}`)
          .send(authOptions);
        // console.log(response);
        const result = await accessToken(response.body.access_token);
        console.log(result);
        // res.send(result);
      }
    } catch (err: unknown) {
      console.error(err);
    }
  });
// in query params: "code" +
// post reuqest to Twitter API with received "code" and "twitter_client_id", "twitter_client_secret" from .env +
// in response you'll have authToken and refreshAuthToken
// save them to DB and send it to user

authRouter.route("/register").post(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await register(data);
  res.send(result);
});

authRouter.route("/login").post(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await login(data);
  res.send(result);
});

export default authRouter;
