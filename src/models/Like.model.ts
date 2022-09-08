import mongoose, { model, Schema, Document, Types } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Like extends Document {
  user: Types.ObjectId;
  tweet: Types.ObjectId;
}

const LikeSchema: Schema = new Schema<Like>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  tweet: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Tweet",
  },
});
LikeSchema.plugin(paginate);
export const LikeModel = model<Like, mongoose.PaginateModel<Like>>(
  "Like",
  LikeSchema,
  "Like"
);
