import app from "../src/app.js";
import connectDB from "../src/config/db.js";

// Vercel invokes this handler for every request. Mongoose reuses the connection
// while a serverless instance remains warm.
export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return res.status(503).json({
      success: false,
      message: "Database connection is unavailable",
    });
  }
}
