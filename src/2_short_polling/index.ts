/**
 * Short Polling:
 * 
 * Request is taking a while, I'll check with you later.
 */


import { env } from "env/module";
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

app.listen(env.PORT, () => console.log(`Listening on ${env.PORT}`))


function startJob(jobId: string, progress: number) {
  jobs[jobId] = progress

  console.log(`updated ${jobId} to ${progress}`)

  if (progress == 100) return;

  setTimeout(() => startJob(jobId, progress + 10), 3000)
}