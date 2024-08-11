import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import { cancelShiprocketOrder, createShiprocketOrder } from "../controller/shiprocketController.js";

const router = express.Router();

router.post("/order/create", protect, admin, createShiprocketOrder);

router.post("/order/cancel", protect, admin, cancelShiprocketOrder);


export default router;