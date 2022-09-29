import WebSocket from "ws";

import { getUser } from "../services/user.service";

export interface WebSocketMessage {
  event: string;
  payload: string;
}

export const connectedUsers: Map<string, Set<WebSocket>> = new Map();
const connections: Map<WebSocket, string> = new Map();

export const connection = async (ws: WebSocket, userid: string | undefined) => {
  if (!userid) {
    ws.close(3000, "Id Required");
    return;
  }
  const userId = userid;
  const arrayOfConnections: Set<WebSocket> = connectedUsers.get(userId);
  if (arrayOfConnections) {
    arrayOfConnections.add(ws);
    connections.set(ws, userId);
  } else {
    try {
      const user = await getUser(userId, userId);

      if (user) {
        connectedUsers.set(userId, new Set<WebSocket>([ws]));
        connections.set(ws, userId);
      } else {
        ws.close(3000, "User doesn`t exist");
      }
    } catch (error) {
      console.warn(error);
      ws.close(3000, error.message);
    }
  }
  ws.on("close", (code, reason) => {
    if (code != 3000) {
      ws.send(reason);
      const id: string = connections.get(ws);
      connections.delete(ws);
      const cu = connectedUsers.get(id);
      cu.delete(ws);
      if (cu.size == 0) {
        connectedUsers.delete(id);
      }
    }
  });
  ws.send(JSON.stringify({ event: connection, payload: "Connected" }));
};
export const disconnect = (ws: WebSocket) => {
  const id: string = connections.get(ws);
  connections.delete(ws);
  const cu = connectedUsers.get(id);
  cu.delete(ws);
  if (cu.size == 0) {
    connectedUsers.delete(id);
  }
};
