import { Request } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";

import sendMessageToWebSocket from "../helpers/sendMessageToWebSocket";
import { getAll, getOne } from "../repositories/likes.repository";
import {
  createOne,
  deleteOne,
  getList,
  getOneById,
  changeStats,
  updateOne,
} from "../repositories/tweet.repository";
import { deleteLikes } from "./likes.service";
import { updateTagsFromContent } from "./tags.service";

export const getAllTweets = async (
  req: Request,
  currentUserId: string,
  onlyCurrentUserTweets?: boolean
) => {
  const [query, options] = new PaginationParameters({ query: req.query }).get();
  options.leanWithId = true;
  options.lean = true;
  const list = await getList(
    onlyCurrentUserTweets ? { ...query, author: currentUserId } : { ...query },
    options
  );
  if (currentUserId) {
    const listOfTweetId = list.docs.map((doc) => doc.id);

    const liked = await getAll(
      { user: currentUserId, tweet: { $in: listOfTweetId } },
      {}
    );

    liked.docs.forEach((record) => {
      listOfTweetId.forEach((currentId, index) => {
        if (currentId == record.tweet._id) {
          list.docs[index].isLiked = true;
        }
      });
    });
  }

  return list;
};

export const getAllTweetsOfCurrentUser = (req: Request) => {
  return getAllTweets(req, req.user._id, true);
};

export const getTweetById = async (id: string, currentUserId: string) => {
  const searchTweet = await getOneById(id);
  if (currentUserId) {
    const liked = await getOne({ user: currentUserId, tweet: id });
    if (liked) {
      searchTweet.isLiked = true;
    }
  }
  return searchTweet;
};

export const createTweet = async (
  author: string,
  content: string,
  repliedTo?: string
) => {
  const createResult = await createOne(author, content, repliedTo);

  await updateTagsFromContent(content);
  sendMessageToWebSocket({
    event: "tweet",
    payload: JSON.stringify(createResult),
  });
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
  if (tweetOldData.content !== updateResult.content) {
    updateTagsFromContent(updateResult.content, tweetOldData.content);
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

export const deleteTweet = async (id: string, author: string) => {
  const result = await deleteOne(id, author);
  await deleteLikes({ tweet: id });
  return result;
};
