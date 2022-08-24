import { ObjectId } from "mongodb";
import { model, Schema, Document } from "mongoose";

export interface Tweet extends Document {
  //reference
  authorId: ObjectId;
  content: string;
  createdAt: Date;
  repliedTo: ObjectId | null;
  updatedAt: Date;
  stats: {
    likes: number;
    retweets: Array<ObjectId>;
    //Comments - todo, comments base
  };
}

const TweetSchema: Schema = new Schema<Tweet>({
  authorId: {
    type: ObjectId,
    required: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  repliedTo: {
    type: ObjectId,
    required: false,
  },

  updatedAt: {
    type: Date,
    required: false,
    default: new Date(0),
  },
  stats: {
    required: false,
    likes: { type: Number, default: 0 },
    retweets: { type: Array<ObjectId>, default: 0 },
    //Comments - todo, comments base
  },
});

export const TweetModel = model<Tweet>("Tweet", TweetSchema);
