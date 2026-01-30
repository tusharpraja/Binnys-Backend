import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Binny\'s Backend is running!' });
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;