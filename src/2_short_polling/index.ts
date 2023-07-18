/**
 * Short Polling:
 * 
 * Request is taking a while, I'll check with you later.
 * 
 * Pros:
 * - Simple
 * - Good for long running requests
 * - Client can disconnect
 * 
 * Cons:
 * - Too chatty
 * - Heavy on network bandwidth
 * - Wasted backend resources
 */


import { env } from "@/env/module";
import express from "express";

const app = express();
const jobs: {[key: string]: number} = {};

app.get("/submit", (_, res) => {
  const jobId = `job:${Date.now()}`;
  jobs[jobId] = 0;
  startJob(jobId, 0);
  res.end("\n\n" + jobId + "\n\n");
});

app.get("/checkstatus/:jobId", (req, res) => {
  console.log(jobs[req.params.jobId])

  if (jobs[req.params.jobId] < 100) {
    res.end("\n\n" + jobs[req.params.jobId] + "%" + "\n\n")
  } else {
    res.end("expensive data")
  }
})


function startJob(jobId: string, progress: number) {
  jobs[jobId] = progress

  console.log(`updated ${jobId} to ${progress}`)

  if (progress == 100) return;

  setTimeout(() => startJob(jobId, progress + 10), 3000)
}

export default app