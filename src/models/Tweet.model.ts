import { ObjectId } from "mongodb";
import mongoose, { model, Schema, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Tweet extends Document {
  //reference
  authorId: ObjectId;
  content: string;
  createdAt: string;
  repliedTo?: ObjectId;
  updatedAt: string;
  stats: {
    likes: number;
    retweets: number;
    //Comments - todo, comments base
  };
}

const TweetSchema: Schema = new Schema<Tweet>({
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  content: {
    type: String,
  },
  createdAt: {
    type: String,
    required: true,
  },
  repliedTo: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Tweet",
  },

  updatedAt: {
    type: String,
    required: false,
    default: "",
  },
  stats: {
    required: false,
    likes: { type: Number, default: 0 },
    retweets: { type: Number, default: 0 },
    //Comments - todo, comments base
  },
});
TweetSchema.plugin(paginate);
export const TweetModel = model<Tweet, mongoose.PaginateModel<Tweet>>(
  "Tweet",
  TweetSchema
);
