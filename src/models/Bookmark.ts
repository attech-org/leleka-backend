import { ObjectId } from "mongodb";
import { model, Schema, Document } from "mongoose";

export interface Bookmark extends Document {
  tweetId: ObjectId;
  ownerId: ObjectId;
}

const BookmarkSchema: Schema = new Schema<Bookmark>(
  {
    tweetId: {
      type: String,
    },
  },

  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        return ret;
      },
    },
  }
);

export const BookmarkModel = model<Bookmark>("Bookmarks", BookmarkSchema);
