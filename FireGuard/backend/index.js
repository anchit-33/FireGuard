import express, { json } from "express";
import { existsSync, readFileSync, writeFileSync } from "fs";
import cors from "cors";
const app = express();
const PORT = 5000;

app.use(cors());
app.use(json());

let blockedIPs = new Set();
let requestLogs = [];

const loadBlockedIPs = () => {
  if (existsSync("blockedIPs.json")) {
    const data = readFileSync("blockedIPs.json");
    blockedIPs = new Set(JSON.parse(data));
  }
};

const saveBlockedIPs = () => {
  writeFileSync("blockedIPs.json", JSON.stringify([...blockedIPs]));
};

loadBlockedIPs();

// Middleware to block IPs
app.use((req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  requestLogs.push({ ip, time: new Date().toISOString() });
  if (requestLogs.length > 100) requestLogs.shift(); // Limit logs

  if (blockedIPs.has(ip)) {
    return res.status(403).json({ message: "Your IP is blocked by firewall." });
  }
  next();
});

app.get("/api/logs", (req, res) => {
  res.json(requestLogs.slice().reverse());
});

app.get("/api/blocked", (req, res) => {
  res.json([...blockedIPs]);
});

app.post("/api/block", (req, res) => {
  const { ip } = req.body;
  blockedIPs.add(ip);
  saveBlockedIPs();
  res.json({ message: `${ip} blocked` });
});

app.post("/api/unblock", (req, res) => {
  const { ip } = req.body;
  blockedIPs.delete(ip);
  saveBlockedIPs();
  res.json({ message: `${ip} unblocked` });
});
app.get("/", (req, res) => {
  res.send("Firewall backend is running");
});
app.listen(PORT, () => {
  console.log(`Firewall backend running on http://localhost:${PORT}`);
});
