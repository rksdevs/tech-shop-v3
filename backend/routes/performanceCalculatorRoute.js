import express from "express";
import {protect, admin} from "../middlewares/authMiddleware.js";
import {getCompatibilityPrediction, getGuidanceOnChat, getPerformanceEstimate, getPredictionFromExistingPc, sendMessage,} from "../controller/pcConfigDetailsController.js";
const router = express.Router();

router.post("/getPerformanceDetails",protect, getPerformanceEstimate);

router.post("/getSuitablePrebuiltPC", protect, getPredictionFromExistingPc);

router.post("/getCompatibility", protect, getCompatibilityPrediction);

// POST route to send message
router.post('/send-message', protect, sendMessage);

router.get("/assistant-stream", protect, getGuidanceOnChat);


export default router;