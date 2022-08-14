import express from "express";
import { connectDB } from "./config/db";
import apiRoutes from "./routes/index.route";

const app = express();
const PORT = process.env.PORT || 5000;

//connect to db
connectDB();

app.use(express.json());

app.use("/api", apiRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
