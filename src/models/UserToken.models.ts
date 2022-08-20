import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

export interface UserToken extends Document {
  userId: Types.ObjectId;
  token: string;
  createdAt: Date;
}

const userTokenSchema = new Schema<UserToken>({
  userId: { type: Schema.Types.ObjectId, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 30 * 86400 }, // 30 days
});

const UserTokenModel = mongoose.model("UserToken", userTokenSchema);

export default UserTokenModel;
