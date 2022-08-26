import { ObjectId } from "mongodb";
import mongoose, { model, Schema, Document } from "mongoose";

export interface Bookmark extends Document {
  tweetId: ObjectId;
  ownerId: ObjectId;
  createdAt: Date;
  updatedAt: Date | null;
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
    type: Date,
    required: true,
  },

  updatedAt: {
    type: Date || null,
    required: false,
  },
});

export const BookmarkModel = model<Bookmark>("Bookmark", BookmarkSchema);
