import Movie from "../models/Movie.js";

// ✅ ADD MOVIE (LAZY INSERTION – EASY PHASE 6)
export const addMovie = async (req, res) => {
  try {
    const { title, description, rating, releaseDate, duration } = req.body;

    // ✅ Basic validation
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    // ✅ Respond immediately (non-blocking)
    res.status(202).json({
      message: "Movie queued for insertion"
    });

    // ✅ Lazy insertion (background task)
    setTimeout(async () => {
      try {
        await Movie.create({
          title,
          description,
          rating,
          releaseDate,
          duration
        });
        console.log("Movie inserted lazily:", title);
      } catch (err) {
        console.error("Lazy insert failed:", err.message);
      }
    }, 0);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET MOVIES (Pagination)
export const getMovies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Movie.countDocuments();

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total,
      movies
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ⏳ UPDATE (placeholder)
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Update only fields that are sent
    movie.title = req.body.title || movie.title;
    movie.description = req.body.description || movie.description;
    movie.rating = req.body.rating || movie.rating;
    movie.releaseDate = req.body.releaseDate || movie.releaseDate;
    movie.duration = req.body.duration || movie.duration;

    const updatedMovie = await movie.save();

    res.json({
      message: "Movie updated successfully",
      movie: updatedMovie
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ⏳ DELETE (placeholder)
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await movie.deleteOne();

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔍 SEARCH MOVIES
export const searchMovies = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query required" });
    }

    const movies = await Movie.find({
      $text: { $search: q }
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔃 SORT MOVIES
export const sortMovies = async (req, res) => {
  try {
    const { by = "title", order = "asc" } = req.query;

    const sortOrder = order === "desc" ? -1 : 1;

    const movies = await Movie.find().sort({ [by]: sortOrder });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


