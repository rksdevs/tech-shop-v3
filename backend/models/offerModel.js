import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    offerName: {
        type: String,
        required: true,
    },
    offerDiscount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        required: true,
        default: 'Inactive'
    },
    offerImage: {
        type: String,
        required: true,
    },
    offerHeading: {
        type: String,
        required: true,
    },
    offerTagline: {
        type: String,
        required: true,
    }
})

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;