import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/health", (request, response) => {
  response.status(200).json({
    success: true,
    message: "UniLink API is running",
  });
});

export default app;