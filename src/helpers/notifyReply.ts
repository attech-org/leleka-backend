import WebSocket from "ws";

import { connectedUsers, WebSocketMessage } from "../config/ws";

export const sendNotify = (message: WebSocketMessage, userId: string) => {
  const sockets = connectedUsers.get(userId);
  if (sockets) {
    sockets.forEach((socket: WebSocket) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      }
    });
  }
};
