import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
  sortMovies
} from "../controllers/movieController.js";


const router = express.Router();

// Public
router.get("/", getMovies);

// Admin protected
router.post("/", authMiddleware, roleMiddleware("admin"), addMovie);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateMovie);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteMovie);
router.get("/search", searchMovies);
router.get("/sorted", sortMovies);


export default router;
