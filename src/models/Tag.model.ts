import { model, Schema, Document } from "mongoose";

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
export const TagModel = model<Tag>("Tag", TagSchema);
