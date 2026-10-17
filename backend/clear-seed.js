import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import Application from "./src/models/application.model.js";

dotenv.config({ path: new URL("./src/.env", import.meta.url) });

const seedPrefix = "[SEED:job-tracker-v1:";

try {
  await connectDB();
  const result = await Application.deleteMany({
    notes: { $gte: seedPrefix, $lt: `${seedPrefix}\uffff` },
  });
  console.log(`Removed ${result.deletedCount} seed applications.`);
} catch (error) {
  console.error("Seed cleanup failed:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
