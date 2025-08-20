import axios from "axios";

export const logEvent = async (level, source, message) => {
  try {
    await axios.post("http://localhost:4000/log", {
      level,
      source,
      message,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Failed to send log:", error);
  }
};
