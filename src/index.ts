import express from "express";

import { connectDB } from "./config/db";
import invalidPathHandler from "./middlewares/invalidPathHandler";
import apiRoutes from "./routes/index.route";

const app = express();
const PORT = process.env.PORT || 5000;

//connect to db
connectDB();

app.use(express.json());

app.use("/api", apiRoutes);

app.use(invalidPathHandler);

const server = app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.error(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
