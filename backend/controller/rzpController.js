import Razorpay from "razorpay";
import asyncHandler from "../middlewares/asyncHandler.js";
import dotenv from 'dotenv'
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_TEST_KEY,
    key_secret: process.env.RAZORPAY_TEST_SECRET
})

// Controller function to handle payment initiation
const initiatePayment = asyncHandler(async (req, res) => {
    // Extract order details from request body
    const { amount, currency, receipt, notes } = req.body;

    try {
        // Create order with Razorpay - need to modify notes, currency & receipt from client side 
        let option = {
            amount: amount*100,
            currency,
            receipt,
            notes
        }
        const order = await razorpay.orders.create(option);

        // If order creation is successful, send the order ID back to the client
        res.status(200).json({ orderId: order.id });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

const razorpayKey = (req,res)=>{
    const razorpayCreds = process.env.RAZORPAY_TEST_KEY;
    res.status(200).json(razorpayCreds);
}

export {initiatePayment, razorpayKey}