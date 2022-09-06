import mongoose, { Schema, Document, Types } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Following extends Document {
  following: Types.ObjectId;
  follower: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

const FollowingSchema: Schema = new Schema<Following>({
  following: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },

  follower: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },

  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },

  updatedAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

FollowingSchema.plugin(paginate);

export const FollowingModel = mongoose.model<
  Following,
  mongoose.PaginateModel<Following>
>("Folowings", FollowingSchema, "Folowings");
