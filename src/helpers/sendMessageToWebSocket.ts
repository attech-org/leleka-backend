import WebSocket from "ws";

import { webSocketServer } from "../index";

interface WebSocketMessage {
  event: string;
  payload: string;
}

const sendMessageToWebSocket = (message: WebSocketMessage) => {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

export default sendMessageToWebSocket;
