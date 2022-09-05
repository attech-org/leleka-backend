import mongoose, { Schema, Document, Types } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Follower extends Document {
  followerId: Types.ObjectId;
  ownerId: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

const FollowerSchema: Schema = new Schema<Follower>({
  followerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  ownerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
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

FollowerSchema.plugin(paginate);

export const FollowerModel = mongoose.model<
  Follower,
  mongoose.PaginateModel<Follower>
>("Follower", FollowerSchema, "Follower");
