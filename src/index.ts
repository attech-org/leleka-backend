import cors from "cors";
import express, { Request, Response } from "express";
import "express-async-errors";

import { connectDB } from "./config/db";
import errorHandler from "./middlewares/errorHandler.middlewares";
import httpLogger from "./middlewares/httpLogger";
import apiRoutes from "./routes/index.route";

const app = express();
const PORT = process.env.PORT || 5000;

//connect to db
connectDB();
app.use(express.json());
app.use(httpLogger);
app.use(cors());
app.use("/api", apiRoutes);
app.use((req: Request, res: Response) => {
  res.status(404);

  // respond with json
  if (req.accepts("json")) {
    res.json({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

app.use(errorHandler);

// const server = app.listen(PORT, () => {
//   console.warn(`Server is running on port ${PORT}`);
// });

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (error: unknown) => {
  // console.error(`Logged Error: ${error}`);
  // server.close(() => process.exit(1));
  if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error(String(error));
  }
});
