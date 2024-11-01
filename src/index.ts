import express from "express";
import healthRoutes from "./routes/healthRoutes";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes';
import mongoose from 'mongoose';
import { connectDB } from './config/database';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

// API Routes
app.use("/api", healthRoutes);
app.use('/api/auth', authRoutes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint not found",
    data: {},
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
