import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';

import { connectDB } from './config/database';
import healthRoutes from "./routes/healthRoutes";
import authRoutes from './routes/authRoutes';
import bookRouter from "./routes/book.route";
import mechanismRoutes from './routes/mechanism.route';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// Root endpoint
app.get("/", (_, res) => {
  res.status(200).send("Server is up and running 💫");
});

// API Routes
app.use("/api", healthRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/book", bookRouter);
app.use('/api/mechanism', mechanismRoutes);

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
