import mongoose, { Schema, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Following extends Document {
  followingId: mongoose.Schema.Types.ObjectId;
  ownerId: mongoose.Schema.Types.ObjectId;
  createdAt: string;
  updatedAt?: string;
}

const FollowingSchema: Schema = new Schema<Following>({
  followingId: {
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
