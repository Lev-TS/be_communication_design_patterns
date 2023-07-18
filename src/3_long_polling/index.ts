/**
 * Long Polling:
 *
 * Request is taking a while, I'll check with you later 
 * but talk to me only when it's ready
 * 
 * Pros:
 * - Less chatty
 * - Backend friendly
 * - Client can disconnect
 * 
 * Cons:
 * - Not real time
 */

import { env } from "@/env/module";
import express from "express";

const app = express();
const jobs: { [key: string]: number } = {};

app.get("/submit", (_, res) => {
  const jobId = `job:${Date.now()}`;
  jobs[jobId] = 0;
  startJob(jobId, 0);
  res.end("\n\n" + jobId + "\n\n");
});

app.get("/status/:jobId", async (req, res) => {
  console.log(jobs[req.params.jobId]);

  while(await checkJobComplete(req.params.jobId) == false);
  res.end("\n\nJobStatus: complete " + jobs[req.params.jobId] + "%\n\n")
});

function startJob(jobId: string, progress: number) {
  jobs[jobId] = progress;

  console.log(`updated ${jobId} to ${progress}`);

  if (progress == 100) return;

  setTimeout(() => startJob(jobId, progress + 10), 3000);
}

function checkJobComplete(jobId: string) {
  return new Promise((resolve) => {
    if (jobs[jobId] < 100) {
      setTimeout(() => resolve(false), 1000);
    } else {
      resolve(true)
    }
  });
}

export default function start() {
  app.listen(env.PORT, () =>
    console.log(`server is listening on http://localhost${env.PORT}`)
  );
}