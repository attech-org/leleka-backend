import { ObjectId } from "mongodb";
import mongoose, { model, Schema, Document } from "mongoose";

export interface Bookmark extends Document {
  tweetId: ObjectId;
  ownerId: ObjectId;
  createdAt: string;
  updatedAt: string | null;
}

const BookmarkSchema: Schema = new Schema<Bookmark>({
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tweet",
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
    type: String || null,
    required: false,
  },
});

export const BookmarkModel = model<Bookmark>("Bookmark", BookmarkSchema);
