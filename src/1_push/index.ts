/**
 * Push:
 * 
 * I want it as soon as possible
 */

import http from "http";
import WebSocket from "websocket";

const connections: WebSocket.connection[] | [] = [];

const httpServer = http.createServer();
const webSocketServer = new WebSocket.server({ httpServer });

httpServer.listen(3000, () => console.log("server is listening on port 3000"));

webSocketServer.on("request", (request) => {
  const connection = request.accept(null, request.origin);

  // @ts-ignore
  connections.push(connection);

  connections.forEach(
    (con) =>
      con.connected && con.send(`User${connection.socket.remotePort} connected`)
  );

  connection.on("message", (message) => {
    connections.forEach(
      (con) =>
      con.connected &&
      con.send(
          // @ts-ignore
          `User${connection.socket.remotePort} says: ${message.utf8Data}`
        )
    );
  });
});
