import cors from "cors";
import express, { Request, Response } from "express";
import "express-async-errors";
import WebSocket from "ws";

import { connectDB } from "./config/db";
import Logger from "./config/Logger";
import errorHandler from "./middlewares/errorHandler.middlewares";
import httpLogger from "./middlewares/httpLogger.middlewares";
import apiRoutes from "./routes/index.route";

export const app = express();
const PORT = process.env.PORT || 5000;
const webSocketPort = process.env.WEBSOCKET_PORT || 5001;

export const webSocketServer = new WebSocket.Server({ port: +webSocketPort });

//connect to db
connectDB();
app.use(express.json());
app.use(httpLogger);
app.use(cors());
app.use("/api", apiRoutes);
app.use((req: Request, res: Response) => {
  res.status(404);
  Logger.error({
    error: "Not found",
    originalUrl: req.originalUrl,
    hostname: req.hostname,
    method: req.method,
    status: 404,
  });
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

export const server = app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (error: unknown) => {
  // server.close(() => process.exit(1));
  // console.error(`Logged Error: ${error}`);
  // this error will be caught in middlewares
  throw error;
});

webSocketServer.on("connection", (ws) => {
  console.warn(`WebSocket server is running on port ${webSocketPort}`);
  ws.on("message", (message: WebSocket.RawData) => {
    webSocketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.send("{ connection: true }");
});

webSocketServer.on("error", (error) => {
  console.warn(
    `Error WebSocket server is running on port ${webSocketPort}: ${error}`
  );
});
