import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import Application from "./src/models/application.model.js";

dotenv.config({ path: new URL("./src/.env", import.meta.url) });

try {
  await connectDB();
  const result = await Application.deleteMany({});
  console.log(`Removed ${result.deletedCount} existing applications.`);
} catch (error) {
  console.error("Application cleanup failed:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
