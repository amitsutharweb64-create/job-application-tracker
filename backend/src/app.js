import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import applicationRouter from "./routers/application.route.js";
import authRouter from "./routers/auth.route.js";

dotenv.config({ path: new URL("./.env", import.meta.url) });

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const defaultClientOrigin = isProduction
  ? "https://job-application-tracker-s5qh.vercel.app"
  : "http://localhost:5173";
const clientOrigins = (process.env.CLIENT_ORIGIN || defaultClientOrigin)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const isLocalDevelopmentOrigin = (origin) =>
  !isProduction && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

if (isProduction) {
  app.set("trust proxy", 1);
}

app.use(
  cors({
    origin(origin, callback) {
      // Requests without an Origin header (health checks, curl) are not browser CORS requests.
      if (!origin || clientOrigins.includes(origin) || isLocalDevelopmentOrigin(origin)) {
        return callback(null, true);
      }
      console.warn(`Blocked CORS origin: ${origin}`);
      return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running Successfully",
  });
});
app.use("/api/application", applicationRouter);
app.use("/api/auth", authRouter);

app.use((error, _req, res, _next) => {
  console.error("Unhandled request error:", error.message);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

export default app;
