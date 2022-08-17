import express, { Request, Response } from "express";
import superagent from "superagent";

import { register } from "../services/auth.service";

const authRouter = express.Router();

const redirectUri = `http://localhost:${process.env.PORT}/api/auth/twitter-callback`;
const twitterClientId = process.env.TWITTER_CLIENT_ID;
const twitterClientSecret = process.env.TWITTER_CLIENT_SECRET;
const state = {};
const codeChallenge = "sdSD939fFFsfdfdskojilmsionjfje";

// const authOptions = {
//   method: "POST",
//   url: "https://api.twitter.com/2/oauth2/token",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },

//   form: {
//     grantType: "authorization_code",
//     clientId: twitterClientId,
//     clientSecret: twitterClientSecret,
//     code: code,
//     redirectUri: redirectUri,
//   },
// };

authRouter.route("/twitter").get(async (_req: Request, res: Response) => {
  res.redirect(
    `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${twitterClientId}&redirect_uri=${redirectUri}&scope=tweet.read%20users.read%20follows.read%20follows.write&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=plain`
  );
});

authRouter
  .route("/twitter-callback")
  .get(async (req: Request, res: Response) => {
    const code = req.query.code;
    res.sendStatus(200);
    if (code) {
      try {
        const form = {
          code: code,
          grant_type: "authorization_code",
          // client_id: twitterClientId,
          redirect_uri: redirectUri,
          code_verifier: codeChallenge,
        };

        const base64secret = new Buffer(
          `${twitterClientId}:${twitterClientSecret}`
        ).toString("base64");
        const response = await superagent
          .post("https://api.twitter.com/2/oauth2/token")
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set("Authorization", `Basic ${base64secret}`)
          .send(form);
        console.info("Request", response.body);
      } catch (err: unknown) {
        console.error(err);
      }
    }
  });
// in query params: "code" +
// post reuqest to Twitter API with received "code" and "twitter_client_id", "twitter_client_secret" from .env +
// in response you'll have authToken and refreshAuthToken
// save them to DB and send it to user

authRouter.route("/register").post(async (req: Request, res: Response) => {
  try {
    // process input data
    // call repository method
    const data = req.body;
    const result = await register(data);
    res.send(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    console.error(error);
    res.status(400).send(message);
  }
});

export default authRouter;
