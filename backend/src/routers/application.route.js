import express from "express";

import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  updateApplicationStatus,
} from "../controller/application.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getApplications); 

router.get("/:id", getApplicationById);

router.post("/create", createApplication);

router.patch("/status-update/:id", updateApplicationStatus);

router.put("/update/:id", updateApplication);

router.delete("/delete/:id", deleteApplication);

export default router;
