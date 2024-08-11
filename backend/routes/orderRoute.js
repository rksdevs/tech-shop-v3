import express from "express";
import {protect, admin} from "../middlewares/authMiddleware.js";
import {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getAllOrders, updateOrderToShipped, uploadBill, addBillToOrder, updateOrderwithBill, updateOrderToCancelled} from "../controller/orderController.js"

const router = express.Router();

//createNewOrder
router.post('/', protect, addOrderItems);

//get logged in users orders
router.get('/myorders', protect, getMyOrders);

//get a particular order
router.get('/:id', protect, getOrderById);

//update order to paid
router.put('/:id/pay', protect, updateOrderToPaid);

//update order to delivered
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

//update order to shipped
router.put('/:id/shipped', protect, admin, updateOrderToShipped);

//update order to cancel
router.put('/:id/cancelByUser', protect, updateOrderToCancelled);

//update order with Bill
router.put('/:id/addBill', protect, admin, updateOrderwithBill);

//get all orders
router.get('/', protect, admin, getAllOrders);

//upload bill
router.post("/uploadBill", uploadBill.single('bill'), addBillToOrder)

export default router;

