import { ObjectId } from "mongodb";
import { model, Schema, Document } from "mongoose";

export interface Like extends Document {
  userId: ObjectId;
  tweetId: ObjectId;
}

const LikeSchema: Schema = new Schema<Like>({
  userId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  tweetId: {
    type: ObjectId,
    required: true,
    ref: "Tweet",
  },
});
export const LikeModel = model<Like>("Like", LikeSchema);
