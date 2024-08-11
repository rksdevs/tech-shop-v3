import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import { createOffer, deleteOffer, getAllOffers, updateOffer, updateProductOffer, uploadImageOffer, uploadOfferImageMiddleware } from "../controller/offerController.js";
const router = express.Router();

router.get("/allOffers", getAllOffers);

router.post("/createOffer",protect, admin, createOffer);

router.post("/applyOffer", protect, admin, updateProductOffer);

router.put("/updateOffer/:id",protect, admin, updateOffer);

router.post("/uploadOfferImg", uploadOfferImageMiddleware.single('image'), uploadImageOffer)

// router.post("/cancelOffer/offer/:id", protect, admin, cancelOffer);

router.delete("/:id",protect, admin, deleteOffer);

export default router;