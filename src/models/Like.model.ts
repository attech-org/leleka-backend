import { ObjectId } from "mongodb";
import { model, Schema, Document } from "mongoose";

export interface Like extends Document {
  user: ObjectId;
  tweet: ObjectId;
}

const LikeSchema: Schema = new Schema<Like>({
  user: {
    type: ObjectId,
    required: true,
    ref: "Users",
  },
  tweet: {
    type: ObjectId,
    required: true,
    ref: "Tweet",
  },
});
export const LikeModel = model<Like>("Like", LikeSchema);
