import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const exists = await User.findOne({ email: "admin@movie.com" });
    
    if (exists) {
      // Update existing admin - let schema middleware hash the password
      exists.password = "admin123";
      await exists.save();
      console.log("Admin password updated");
    } else {
      // Create new admin
      await User.create({
        name: "Admin",
        email: "admin@movie.com",
        password: "admin123",
        role: "admin"
      });
      console.log("Admin created");
    }
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
