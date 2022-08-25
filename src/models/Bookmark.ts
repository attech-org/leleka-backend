import { ObjectId } from "mongodb";
import mongoose, { model, Schema, Document } from "mongoose";

export interface Bookmark extends Document {
  tweetId: ObjectId;
  ownerId: ObjectId;
}

const BookmarkSchema: Schema = new Schema<Bookmark>({
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tweet",
  },

  ownerId: {
    type: ObjectId,
    required: true,
  },
});

export const BookmarkModel = model<Bookmark>("Bookmark", BookmarkSchema);
