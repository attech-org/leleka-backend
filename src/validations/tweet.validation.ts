import * as yup from "yup";

// import { getPaginationSchema } from "./general.validation";

const tweetSchema = yup.object({
  author: yup.string(),
  repliedTo: yup.string(),
  content: yup.string(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
  stats: yup.object({
    likes: yup.number(),
    retweets: yup.number(),
  }),
});

export const getTweets = yup.object({
  // query: getPaginationSchema(tweetSchema),
});

export const getTweetById = yup.object({
  params: yup.object({ id: yup.string() }),
});

export const getMyTweets = yup.object({
  user: yup.object({ _id: yup.string() }),
});

export const postTweet = yup.object({
  body: tweetSchema,
});

export const putTweet = yup.object({
  params: yup.object({ id: yup.string() }),
  body: tweetSchema,
});

export const deleteTweet = yup.object({
  params: yup.object({ id: yup.string() }),
});
