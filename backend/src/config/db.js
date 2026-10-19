
import mongoose from "mongoose";

let connectionPromise;

const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL environment variable is required");
  }

  if (mongoose.connection.readyState === 1) return mongoose.connection;

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URL, {
        dbName: process.env.MONGO_DB_NAME || "Application",
        serverSelectionTimeoutMS: 10000,
      })
      .then(() => {
        console.log("Database Connected");
        return mongoose.connection;
      })
      .catch((error) => {
        connectionPromise = undefined;
        throw error;
      });
  }

  return connectionPromise;
};

export default connectDB;
