import express from 'express';
const router = express.Router();
import { protect } from '../middlewares/authMiddleware.js';
import { initiatePayment, razorpayKey } from '../controller/rzpController.js';

router.post('/payment', protect, initiatePayment)
router.get('/rzp-key', protect, razorpayKey)

export default router;