import axios from "axios";
import dotenv from "dotenv";
import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
dotenv.config()


async function authenticate() {
  try {
    const response = await axios.post(`${process.env.SHIPROCKET_BASE_URL}/auth/login`, {
      email: process.env.SHIPROCKET_API_USER_EMAIL,
      password: process.env.SHIPROCKET_API_USER_PASSWORD
    });
    return response.data.token;
  } catch (error) {
    console.error('Error authenticating with Shiprocket:', error);
    throw error;
  }
}

const createShiprocketOrder = asyncHandler(async (req, res) => {
    const orderDetails = req.body;
    try {
      const token = await authenticate();
      const response = await axios.post(
        `${process.env.SHIPROCKET_BASE_URL}/orders/create/adhoc`,
        orderDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.data) {
        // Update the customer order with Shiprocket details
        const updatedOrder = await Order.findByIdAndUpdate(
          orderDetails?.order_id,
          {
            $set: {
              'shiprocketDetails.shiprocketOrderId': response?.data?.order_id,
              'shiprocketDetails.shiprocketShipmentId': response?.data?.shipment_id, // If available
              'shiprocketDetails.shiprocketStatus': response?.data?.status,
              'shiprocketDetails.shiprocketStatusForCustomer': 'Preparing to Ship',
            //   'isShipped': false,
            //   'shippedAt': null,
            //   'trackingDetails.courierService': 'Shiprocket', // Example value, adjust as needed
            //   'trackingDetails.trackingNumber': response.data.tracking_number // If available
            }
          },
          { new: true }
        );
  
        if (updatedOrder) {
          res.status(200).json({ shiprocketOrder: response.data, updatedOrder });
        } else {
          res.status(500).json({ error: 'Failed to update customer order' });
        }
      } else {
        res.status(500).json({ error: 'Failed to create order in Shiprocket' });
      }
    } catch (error) {
      console.error('Error creating order in Shiprocket:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
  });
  

  const cancelShiprocketOrder = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    if (!ids) {
        return res.status(400).json({ error: 'ids is required' });
    }

    console.log(ids);
    const payload = {
        ids: [ids]  // No need to use template literals for a simple string
    };
    console.log(JSON.stringify(payload));

    const order = await Order.findOne({ "shiprocketDetails.shiprocketOrderId": ids });

    try {
        const token = await authenticate();
        const response = await axios.post(
            `${process.env.SHIPROCKET_BASE_URL}/orders/cancel`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data && order) {
            order.shiprocketDetails.shiprocketStatusForCustomer = "Yet to be shipped";
            order.shiprocketDetails.shiprocketStatus = "CANCELED";
            order.shiprocketDetails.shiprocketOrderId = "NA";
            order.shiprocketDetails.shiprocketShipmentId = "";
            await order.save();
        }

        res.status(200).json({ message: `Shiprocket order no:${ids} has been cancelled!` });
    } catch (error) {
        console.error('Error cancelling shiprocket order:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
});


export {createShiprocketOrder, cancelShiprocketOrder}  
