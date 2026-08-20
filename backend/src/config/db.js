import mongoose from "mongoose"; 

const connectDB = async () => {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL is missing in backend/src/.env");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");
};

export default connectDB;
