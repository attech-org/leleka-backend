import WebSocket from "ws";

import { WebSocketMessage } from "../config/ws";
import { webSocketServer } from "../index";

const sendMessageToWebSocket = (message: WebSocketMessage) => {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

export default sendMessageToWebSocket;
