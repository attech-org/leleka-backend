import { ObjectId } from "mongodb";

import { TweetModel } from "../models/Tweet";

export const getOneById = (id: ObjectId) => {
  return TweetModel.findById(id);
};
export const createOne = async (
  authorId: ObjectId,
  content: string,
  repliedTo?: ObjectId
) => {
  const tweetModel = new TweetModel({
    authorId: authorId,
    content: content,
    repliedTo: repliedTo,
    createdAt: new Date(),
  });
  tweetModel.save();
};
export const deleteOne = async (id: ObjectId) => {
  return TweetModel.deleteOne({ _id: id });
};
export const getAll = async () => {
  return TweetModel.find();
};
export const updateOne = async (
  id: ObjectId,
  newData: {
    content?: string;
    authorId?: ObjectId;
    repliedTo?: ObjectId;
    updatedAt: Date;
  }
) => {
  return TweetModel.updateOne({ _id: id }, newData);
};
