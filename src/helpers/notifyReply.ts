import WebSocket from "ws";

import { connectedUsers } from "../config/ws";

interface NotifyMessage {
  event: string;
  userId: string;
  tweet: object;
}

export const sendNotify = (data: NotifyMessage) => {
  const sockets = connectedUsers.get(data.userId);
  if (sockets) {
    sockets.forEach((socket: WebSocket) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data));
      }
    });
  }
};
