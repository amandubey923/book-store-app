import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import job from "./lib/cron.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

/* ------------------ MIDDLEWARE ------------------ */
app.use(cors());
app.use(express.json());

/* ------------------ ROUTES ------------------ */
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// health check (IMPORTANT for cron & mobile testing)
app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

/* ------------------ START SERVER ------------------ */
const startServer = async () => {
  try {
    await connectDB(); // 🔥 DB first
    console.log("Database connected");

    job.start(); // 🔥 cron after DB
    console.log("Cron job started");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
