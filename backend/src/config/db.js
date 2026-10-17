import mongoose from "mongoose"; 

const connectDB = async () => {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL environment variable is required");
    }

    await mongoose.connect(process.env.MONGO_URL, {
        dbName: process.env.MONGO_DB_NAME || "Application",
        serverSelectionTimeoutMS: 4000,
    });
    console.log("Database Connected");
};

export default connectDB;
