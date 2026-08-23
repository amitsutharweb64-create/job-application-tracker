import express from "express";

import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  updateApplicationStatus,
} from "../controller/application.controller.js";

const router = express.Router();

router.get("/", getApplications);

router.get("/:id", getApplicationById);

router.post("/create", createApplication);

router.patch("/status-update/:id", updateApplicationStatus);

router.put("/update/:id", updateApplication);

router.delete("/delete/:id", deleteApplication);

export default router;