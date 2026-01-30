import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Add this root route
app.get('/', (req, res) => {
  res.json({ message: 'Binny\'s Backend is running!' });
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// ADD THESE LINES AT THE BOTTOM
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;