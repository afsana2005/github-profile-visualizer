import "dotenv/config";
import express from "express";
import cors from "cors";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.send("GitHub Profile Visualizer AI Backend is running successfully!");
});


app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "GitHub Profile Visualizer AI backend is running." });
});

app.use("/api/ai", aiRoutes);

app.use((err, _req, res, _next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ success: false, message: "An unexpected server error occurred." });
});

app.listen(PORT, () => {
  console.log(`AI backend running at http://localhost:${PORT}`);
});
