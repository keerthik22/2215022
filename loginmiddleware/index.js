import "dotenv/config";
import express from "express";
import cors from "cors";
import { sendFrontendLog } from "./utils/logger.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
    methods: ["POST", "OPTIONS"],
  })
);


app.get("/health", (req, res) => res.json({ ok: true }));


app.post("/api/logs", async (req, res) => {
  try {
    const { level, message } = req.body;
    const data = await sendFrontendLog(level, message);
    res.status(200).json(data);
  } catch (err) {
    console.error("log error:", err?.response?.data || err.message);
    res.status(500).json({
      error: "failed to create log",
      detail: err?.response?.data || err.message,
    });
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Logger server running on http://localhost:${PORT}`)
);
