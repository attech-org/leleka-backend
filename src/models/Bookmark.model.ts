import { ObjectId } from "mongodb";
import mongoose, { model, Schema, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Bookmark extends Document {
  tweet: ObjectId;
  owner: ObjectId;
  createdAt: string;
  updatedAt?: string;
}

const BookmarkSchema: Schema = new Schema<Bookmark>({
  tweet: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tweet",
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
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
