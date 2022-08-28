import { ObjectId } from "mongodb";

import { TweetModel } from "../models/Tweet";

export const getOneById = (id: string) => {
  return TweetModel.find({ _id: id });
};
export const createOne = async (
  authorId: string,
  content: string,
  repliedTo?: string
) => {
  const tweetModel = new TweetModel({
    authorId: new ObjectId(authorId),
    content: content,
    repliedTo: new ObjectId(repliedTo),
    createdAt: new Date().toISOString(),
  });
  tweetModel.save();
};
export const deleteOne = async (id: string) => {
  return TweetModel.deleteOne({ _id: new ObjectId(id) });
};
export const getAll = async () => {
  return TweetModel.find();
};
export const updateOne = async (
  id: string,
  newData: {
    content?: string;
    authorId?: string;
    repliedTo?: string;
    updatedAt: string;
  }
) => {
  const data = {
    content: newData.content,
    updatedAt: newData.updatedAt,
    repliedTo: new ObjectId(newData.repliedTo),
    authorId: new ObjectId(newData.authorId),
  };

  return TweetModel.updateOne({ _id: id }, data);
};
