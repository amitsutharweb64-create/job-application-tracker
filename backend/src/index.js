import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import prepRouter from "./routes/prep.routes.js";
import applicationRouter from "./routers/application.route.js";

dotenv.config({ path: new URL("./.env", import.meta.url) });

const app = express();

app.use(cors());
app.use(express.json({ limit: "100kb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running Successfully",
  });
});
app.use("/api/application", applicationRouter);
    
app.use("/api/prep", prepRouter);

app.use((error, _req, res, _next) => {
  console.error("Unhandled request error:", error.message);
  res.status(500).json({ success: false, message: "Something went wrong" });
});


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
