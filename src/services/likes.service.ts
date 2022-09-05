import {
  createOne,
  getOne,
  deleteOne,
  updateOne,
} from "../repositories/likes.repository";
import { getUserById } from "../repositories/user.repository";
import { getTweetById, incrementTweetStats } from "./tweets.service";

export const changeLike = async (tweetId: string, userId: string) => {
  if (getUserById(userId) && getTweetById(tweetId)) {
    const exists = !!(await getOne({ userId, tweetId }));
    if (!exists) {
      await incrementTweetStats(tweetId, "stats.likes", 1);
      return createOne(tweetId, userId);
    } else {
      await incrementTweetStats(tweetId, "stats.likes", -1);
      return deleteOne({ tweetId, userId });
    }
  }
};

export const getLikeById = async (id: string) => {
  return getOne({ _id: id });
};
export const updateLike = async (
  id: string,
  newData: { tweetId?: string; userId?: string }
) => {
  return updateOne(id, newData);
};
