/**
 * Server Sent Events:
 *
 * One request and a very long response
 *
 * Pros:
 * - Real Time
 * - Compatible with Request/response
 *
 * Cons:
 * - Clients must be online
 * - Clients might not be able to handle
 * - Polling is preferred for light clients
 * - HTTP/1.1 can only have 6 concurrent connections
 *
 * Client Code:
 * const sse = new EventSource("http://localhost:3000/stream")
 * sse.onmessage = message => console.log(message.data)
 */

import { env } from "@/env/module";
import express, { type Response } from "express";

const app = express();

app.get("/", (_, res) => res.send("hello!"));

app.get("/stream", (_, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  send(0)(res);
});

const send = (i: number) => (res: Response) => {
  res.write("data: " + `hello from server ---- [${i++}]\n\n`);

  setTimeout(() => send(i)(res), 1000);
};

export default function start() {
  app.listen(env.PORT, () =>
    console.log(`server is listening on http://localhost${env.PORT}`)
  );
}
