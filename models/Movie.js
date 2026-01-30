import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true
    },
    description: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      index: true
    },
    releaseDate: {
      type: Date,
      index: true
    },
    
    poster: { type: String },
    duration: {
      type: Number // minutes
    }
  },
  { timestamps: true }
);

// Text index for search
movieSchema.index({ title: "text", description: "text" });

export default mongoose.model("Movie", movieSchema);
