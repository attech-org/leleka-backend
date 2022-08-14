import mongoose from "mongoose";

export const connectDB = async () => {
  if (process.env.MONGO_URI) {
    await mongoose.connect(process.env.MONGO_URI);
    console.warn("MongoDB Connected");
  } else {
    console.error("MONGO_URI is not provided");
  }
};
