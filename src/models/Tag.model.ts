import mongoose, { Schema, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Tag extends Document {
  name: string;
  stats: {
    tweets: number;
  };
  createdAt: string;
  updatedAt: string;
}

const TagSchema: Schema = new Schema<Tag>({
  name: { type: String, required: true, unique: true },
  stats: {
    type: Object,
    tweets: { type: Number, default: 0 },
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
TagSchema.plugin(paginate);
export const TagModel = mongoose.model<Tag, mongoose.PaginateModel<Tag>>(
  "Tag",
  TagSchema,
  "Tag"
);
