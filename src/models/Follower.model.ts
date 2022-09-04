import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Follower extends Document {
  followerId: ObjectId;
  ownerId: ObjectId;
  createdAt: string;
  updatedAt?: string;
}

const FollowerSchema: Schema = new Schema<Follower>({
  followerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  createdAt: {
    type: String,
    required: true,
  },

  updatedAt: {
    type: String,
    required: false,
  },
});

FollowerSchema.plugin(paginate);

export const FollowerModel = mongoose.model<
  Follower,
  mongoose.PaginateModel<Follower>
>("Follower", FollowerSchema, "Follower");
