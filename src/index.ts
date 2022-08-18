import express from "express";

import { connectDB } from "./config/db";
import httpLogger from "./middlewares/httpLogger";
import apiRoutes from "./routes/index.route";

const app = express();
const PORT = process.env.PORT || 5000;

//connect to db
connectDB();
app.use(express.json());
app.use(httpLogger);

app.use("/api", apiRoutes);

const server = app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.error(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
