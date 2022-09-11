import { Request } from "express";
import { convert } from "html-to-text";
import { PaginationParameters } from "mongoose-paginate-v2";
import TweeterUtils from "twitter-text";

import {
  createOne,
  deleteOne,
  getList,
  getOneById,
  changeStats,
  updateOne,
} from "../repositories/tweet.repository";
import { addTagsFromContent } from "./tags.service";

export const getAllTweetsOfCurrentUser = (req: Request) => {
  const [query, options] = new PaginationParameters(req).get();
  return getList({ ...query, author: req.user._id }, options);
};

export const getAllTweets = (req: Request) => {
  const [query, options] = new PaginationParameters(req).get();
  return getList(query, options);
};

export const getTweetById = (id: string) => {
  return getOneById(id);
};

export const createTweet = async (
  author: string,
  content: string,
  repliedTo?: string
) => {
  const createResult = await createOne(author, content, repliedTo);

  if (createResult) {
    const hashtags = TweeterUtils.extractHashtags(convert(content));
    if (hashtags) {
      await addTagsFromContent(new Set(hashtags));
    }
  }
  return createResult;
};

export const updateTweet = async (
  id: string,
  newData: {
    content?: string;
    author?: string;
    repliedTo?: string;
    stats?: { likes?: number; retweets?: number };
    updatedAt: string;
  }
) => {
  const tweetOldData = await getOneById(id);
  const updateResult = await updateOne(id, newData);

  if (updateResult) {
    const oldHashtags = TweeterUtils.extractHashtags(
      convert(tweetOldData.content)
    );
    const newHashtags = TweeterUtils.extractHashtags(convert(newData.content));
    const hashtagsDiff = newHashtags.filter((x) => !oldHashtags.includes(x));
    if (hashtagsDiff) {
      await addTagsFromContent(new Set(hashtagsDiff));
    }
  }

  return updateResult;
};
export const changeTweetStats = (
  id: string,
  fieldName: string,
  value: number
) => {
  return changeStats(id, fieldName, value);
};

export const deleteTweet = (id: string) => {
  return deleteOne(id);
};
