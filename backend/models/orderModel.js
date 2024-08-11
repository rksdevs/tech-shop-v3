import mongoose from "mongoose";

const orderSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    orderItems: [{
        name: {type:String, required: true},
        qty: {type:Number, required: true},
        image: {type:String, required: true},
        price: {type:Number, required: true},
        sku: {type:String, required: true},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        },
    }],
    shippingAddress: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentDetails: {
        orderId: {
            type: String
        },
        paymentId: {
            type: String
        },
        signature: {
            type: String
        }
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date
    },
    isShipped: {
        type: Boolean,
        required: true,
        default: false,
    },
    shippedAt: {
        type: Date
    },
    trackingDetails: {
        courierService: {
            type: String
        },
        trackingNumber: {
            type: String
        }
    },
    orderBill: {
        type: String,
    },
    shiprocketDetails: {
        shiprocketOrderId: {
            type: String,
            default: "NA"
        },
        shiprocketShipmentId: {
            type: String
        },
        shiprocketStatus: {
            type: String
        },
        shiprocketStatusForCustomer: {
            type: String
        },
    },
    isCancelled: {
        type: Boolean,
        required: true,
        default: false,
    },
    orderType: {
        type: String,
        required: true,
        default: "Regular",
    },
}, {timestamps: true})

const Order = mongoose.model("Order", orderSchema);

export default Order;