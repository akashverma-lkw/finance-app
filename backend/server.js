import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ merged routes

config();
connectDB();

const app = express();

// CORS setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON parser
app.use(express.json());

// Unified Auth & Admin Routes
app.use("/api", authRoutes); // All endpoints prefixed with /api

// Root Test Route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server listen
const PORT = process.env.PORT || 5005;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
