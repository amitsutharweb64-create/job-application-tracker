import { Router } from "express";
import {
  createFeedback,
  createQuestions,
  getPrepStatus,
  listQuickTopics,
} from "../controllers/prep.controller.js";

const prepRouter = Router();

prepRouter.get("/topics", listQuickTopics);
prepRouter.get("/status", getPrepStatus);
prepRouter.post("/questions", createQuestions);
prepRouter.post("/feedback", createFeedback);

export default prepRouter;
