import { LikeModel } from "../models/Like.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const listLikes = async (query: any, options: object) => {
  console.log("query:", query, "options:", options);
  // const selected = query.select({""});
  // const q = LikeModel.find({ author: query });

  // console.log("q:", q);
  // return LikeModel.paginate(query, {
  //   ...options,
  //   pagination: false,
  //   populate: ["user", "tweet"],
  // });

  // return LikeModel.find().populate({
  //   path: "author",
  //   id: { $ne: "Ian Fleming" },
  // });
};

export const getOne = async (
  data: { _id: string } | { user: string; tweet: string }
) => {
  return LikeModel.findOne(data);
};
export const deleteOne = (
  data:
    | {
        _id: string;
      }
    | {
        user: string;
        tweet: string;
      }
) => {
  return LikeModel.deleteOne(data);
};
export const createOne = (tweet: string, user: string) => {
  const likeModel = new LikeModel({
    user,
    tweet,
  });
  return likeModel.save();
};
export const updateOne = (
  id: string,
  newData: { tweet?: string; user?: string }
) => {
  LikeModel.updateOne({ _id: id }, newData);
};
