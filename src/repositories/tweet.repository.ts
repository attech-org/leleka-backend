import { ObjectId } from "mongodb";

import {
  idValidator,
  stringValidator,
} from "../helpers/tweets.validation.utils";
import { TweetModel } from "../models/Tweet";

export const getTweetById = (id: string) => {
  idValidator(id);
  const objectIdId = new ObjectId(id);
  return TweetModel.findById(objectIdId);
};
export const createTweet = async (
  authorId: string,
  content: string,
  repliedTo?: string
) => {
  idValidator(authorId);
  idValidator(repliedTo);
  const objectIdAuthorId = new ObjectId(authorId);
  const objectIdRepliedTo = new ObjectId(repliedTo);
  const tweetModel = new TweetModel({
    authorId: objectIdAuthorId,
    content: content,
    repliedTo: objectIdRepliedTo,
    createdAt: new Date(),
  });
  tweetModel.save();
};
export const deleteTweet = async (id: string) => {
  idValidator(id);
  const objectIdId = new ObjectId(id);
  return TweetModel.deleteOne({ _id: objectIdId });
};
export const getAllTweets = async () => {
  return TweetModel.find();
};
export const updateTweet = async (
  id: string,
  newData: {
    content?: string;
    authorId?: string;
    repliedTo?: string;
    updatedAt: Date;
  }
) => {
  idValidator(id);
  const objectIdId = new ObjectId(id);
  if (newData.content) {
    stringValidator(newData.content);
  }
  if (newData.authorId) {
    idValidator(newData.authorId);
  }
  if (newData.repliedTo) {
    idValidator(newData.repliedTo);
  }
  return TweetModel.updateOne({ _id: objectIdId }, newData);
};
