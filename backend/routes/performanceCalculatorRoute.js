import express from "express";
import {protect, admin} from "../middlewares/authMiddleware.js";
import {getCompatibilityPrediction, getPerformanceEstimate, getPredictionFromExistingPc,} from "../controller/pcConfigDetailsController.js";
const router = express.Router();

router.post("/getPerformanceDetails",protect, getPerformanceEstimate);

router.post("/getSuitablePrebuiltPC", protect, getPredictionFromExistingPc);

router.post("/getCompatibility", protect, getCompatibilityPrediction);

export default router;