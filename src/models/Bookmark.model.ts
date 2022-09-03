import { ObjectId } from "mongodb";
import mongoose, { model, Schema, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Bookmark extends Document {
  tweetId: ObjectId;
  ownerId: ObjectId;
  createdAt: string;
  updatedAt?: string;
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
    type: String,
    required: false,
  },
});

BookmarkSchema.plugin(paginate);
export const BookmarkModel = model<Bookmark, mongoose.PaginateModel<Bookmark>>(
  "Bookmark",
  BookmarkSchema
);
