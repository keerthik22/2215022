import axios from "axios";

const LOG_API = process.env.LOG_API;
const LOG_TOKEN = process.env.LOG_TOKEN;

const LEVELS = new Set(["debug", "info", "warn", "error", "fatal"]);

export async function sendFrontendLog(level, message) {
  const lvl = String(level || "").toLowerCase();
  const msg = String(message || "").toLowerCase();

  if (!LEVELS.has(lvl)) {
    throw new Error(`invalid level "${level}"`);
  }
  if (!LOG_API || !LOG_TOKEN) {
    throw new Error("LOG_API or LOG_TOKEN not configured");
  }
  const payload = {
    stack: "frontend",
    level: lvl,
    package: "api",
    message: msg,
  };

  const res = await axios.post(LOG_API, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOG_TOKEN}`,
    },
    timeout: 8000,
  });

  return res.data; 
}
