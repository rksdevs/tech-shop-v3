import express from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import Order from "../models/orderModel.js";
import Product from '../models/productModel.js';
import Razorpay from "razorpay";
import crypto from 'crypto';
import dotenv from 'dotenv';
import { s3 } from '../utils/aws.S3bucket.js';
import multer from "multer";
import multerS3 from "multer-s3";
import nodemailer from "nodemailer";
import User from '../models/userModel.js';
dotenv.config();


const razorpay = new Razorpay({
    key_id: `${process.env.RAZORPAY_TEST_KEY}`,
    key_secret: `${process.env.RAZORPAY_TEST_SECRET}`
})

//@desc Create new order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async(req,res)=>{
    const { orderItems, shippingAddress, itemsPrice, taxPrice, shippingPrice, paymentMethod, totalPrice, orderType} = req.body;
    //check and update the product stock
    try {
        for (const orderItem of orderItems) {
            const product = await Product.findById(orderItem._id);
            //if the stock is not sufficient to meet the order qty
            if(product.countInStock < orderItem.qty) {
                res.status(400);
                throw new Error(`Insufficient products in stock, choose less quantity`)
            }
    
            //update stock
            if (product) {
                product.countInStock -= orderItem.qty;
                await product.save();
            } else {
                res.status(404);
                throw new Error(`Product with ID ${orderItem.product} not found`);
            }
        }
    
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error ('No order items');
        } else {
            const order = new Order({
                orderItems: orderItems.map((x)=>({
                    ...x,
                    product: x._id,
                    _id: undefined
                })),
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                orderType
            })
    
            const newOrder = await order.save();
            sendOrderPlacedEmail(req.user.email, newOrder?._id, req.user.name)
    
            res.status(201).json(newOrder);
        }
    } catch (error) {
        console.log(error)
        res.status(404);
        throw new Error(`Unable to create order!`);
    }
})

//@desc Get logged in users orders
//@route GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async(req,res)=>{
    const orders = await Order.find({user: req.user._id});
    res.status(200).json(orders)
})

//@desc Get a particular order
//@route GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error ('Order not found!')
    }
})

//@desc Update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async(req,res)=>{
    
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const payload = `${razorpayOrderId}|${razorpayPaymentId}`;

    try {
        const expect = crypto.createHmac('sha256',`${process.env.RAZORPAY_TEST_SECRET}`).update(payload).digest('hex');

        const isValidSignature = expect === razorpaySignature;

        if(isValidSignature) {
            const order = await Order.findById(req.params.id)
            if (order) {
                if(order?.isCancelled) {
                    res.status(400).json({ error: 'Order is already cancelled' });
                    return; 
                }
                order.isPaid = true;
                order.paidAt = Date.now();
                // Save Razorpay payment details if necessary
                order.paymentDetails = {
                    orderId: razorpayOrderId,
                    paymentId: razorpayPaymentId,
                    signature: razorpaySignature
                };
        
                const updatedOrder = await order.save();
                sendPaymentConfirmationEmail(req.user.email, order?._id, req.user.name)

                res.status(200).json(updatedOrder)
            } else {
                res.status(404);
                throw new Error('Order not found')
            }
        } else {
            res.status(400).json({ error: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Error verifying signature:', error);
        res.status(500);
        throw new Error('Internal server error');
    }
})

//@desc Update order to delivered
//@route PUT /api/orders/:id/deliver
//@access Private/admin
const updateOrderToDelivered = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);

    if (order) {
        if(order?.isCancelled) {
            res.status(400).json({ error: 'Order is already cancelled' });
            return; 
        }
        const user = await User.findById(order?.user);
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        order.shiprocketDetails.shiprocketStatusForCustomer = "Delivered";

        const updatedOrder = await order.save();
        sendDeliveryConfirmationEmail(user?.email, order?._id, user?.name)
        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found!')
    }
})

//@desc Get all orders
//@route GET /api/orders
//@access Private/admin
const getAllOrders = asyncHandler(async(req,res)=>{
    const orders = await Order.find({}).populate('user', 'id name')
    res.status(200).json(orders); 
})

const updateOrderToShipped = asyncHandler(async(req,res)=>{
    const {courierService, trackingNumber} = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
        if(order?.isCancelled) {
            res.status(400).json({ error: 'Order is already cancelled' });
            return; 
        }
        const user = await User.findById(order?.user);
        order.isShipped = true;
        order.shippedAt = Date.now();
        order.trackingDetails.courierService = courierService;
        order.trackingDetails.trackingNumber = trackingNumber;
        order.shiprocketDetails.shiprocketStatusForCustomer = "Shipped";

        const updatedOrder = await order.save();
        sendShippingConfirmationEmail(user?.email, order?._id, user?.name);

        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found!')
    }
})

const uploadBill = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'computer-makers-products-cpu',
        acl: 'public-read', // or private based on your use case
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname); // unique file name
        },
    })
})

const addBillToOrder = asyncHandler(async(req, res)=> {
    res.status(200).json({ message: 'Bill uploaded successfully', data: req.file.location });
})

const updateOrderwithBill = asyncHandler(async(req,res)=>{
    const {orderBill} = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
        if(order?.isCancelled) {
            res.status(400).json({ error: 'Order is already cancelled' });
            return; 
        }
        const user = await User.findById(order?.user);
        order.orderBill = orderBill;
        const updatedOrder = await order.save();
        sendBillUpdateEmail(user?.email, order?._id, user?.name);
        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found!')
    }
})

// Create a Nodemailer transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_USER_EMAIL,
        pass: process.env.GOOGLE_USER_PASS
    }
});

// Function to send order placed confirmation email
function sendOrderPlacedEmail(email, orderId, name) {
    let mailOptions = {
        from: process.env.GOOGLE_USER_EMAIL,
        to: email,
        subject: `Order Update for Order No: ${orderId}`,
        text: `Hi ${name}, your order has been placed. Please proceed with making the payment, if you haven't already paid for it. If the payment is completed, please ignore this email. Visit our website to track your order details - www.rksdevs.in. This email address is not monitored, please do not reply you will not receive any response.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
}

// Function to send payment confirmation email
function sendPaymentConfirmationEmail(email, orderId, name) {
    let mailOptions = {
        from: process.env.GOOGLE_USER_EMAIL,
        to: email,
        subject: `Order Update for Order No: ${orderId}`,
        text: `Hi ${name}, your payment for the above order number has been received. Thank you for shopping with us. Visit our website to track your order details - www.rksdevs.in. This email address is not monitored, please do not reply you will not receive any response.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
}

// Function to send shipping confirmation email
function sendShippingConfirmationEmail(email, orderId, name) {
    let mailOptions = {
        from: process.env.GOOGLE_USER_EMAIL,
        to: email,
        subject: `Order Update for Order No: ${orderId}`,
        text: `Hi ${name}, your order has been shipped. Visit our website to track your order details - www.rksdevs.in. This email address is not monitored, please do not reply you will not receive any response.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
}

// Function to send cancellation confirmation email
function sendCancellationConfirmationEmail(email, orderId, name) {
    let mailOptions = {
        from: process.env.GOOGLE_USER_EMAIL,
        to: email,
        subject: `Order Update for Order No: ${orderId}`,
        text: `Hi ${name}, your order has been cancelled. Visit our website to check your order details - www.rksdevs.in. This email address is not monitored, please do not reply you will not receive any response.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
}

// Function to send delivery confirmation email
function sendDeliveryConfirmationEmail(email, orderId, name) {
    let mailOptions = {
        from: process.env.GOOGLE_USER_EMAIL,
        to: email,
        subject: `Order Update for Order No: ${orderId}`,
        text: `Hi ${name}, your order has been delivered. Visit our website to track your order details - www.rksdevs.in. This email address is not monitored, please do not reply you will not receive any response.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
}

// Function to send Bill update email
function sendBillUpdateEmail(email, orderId, name) {
    let mailOptions = {
        from: process.env.GOOGLE_USER_EMAIL,
        to: email,
        subject: `Order Update for Order No: ${orderId}`,
        text: `Hi ${name}, we've added the bill for this order. Visit our website to download your bill - www.rksdevs.in. This email address is not monitored, please do not reply you will not receive any response.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
}

const updateOrderToCancelled = asyncHandler(async(req,res)=>{
    // const {courierService, trackingNumber} = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {

        for (const orderItem of order?.orderItems) {
            const product = await Product.findById(orderItem.product);
    
            //update stock add to the stock
            if (product) {
                product.countInStock += orderItem.qty;
                await product.save();
            } else {
                res.status(404);
                throw new Error(`Product with ID ${orderItem.product} not found`);
            }
        }
        const user = await User.findById(order?.user);
        order.isCancelled = true;
        order.shiprocketDetails.shiprocketStatusForCustomer = "Cancelled by User";

        const updatedOrder = await order.save();
        sendCancellationConfirmationEmail(user?.email, order?._id, user?.name);

        res.status(200).json({message:`Order no: ${req.params.id} has been cancelled`, order:updatedOrder});
    } else {
        res.status(404);
        throw new Error('Order not found!')
    }
})



export {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getAllOrders, updateOrderToShipped, addBillToOrder, uploadBill, updateOrderwithBill, updateOrderToCancelled}