import express from "express";
import { deleteSubscriber, getAllSubscribers, sendChatToAdmin, sendNewProductToAllSubscribers, sendOffersToAllSubscribers, subscribeToNewsletter } from "../controller/newsLetterController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/subscribe', subscribeToNewsletter);

// DELETE route to delete a specific subscriber
router.delete('/unsubscribe', protect, deleteSubscriber);

// GET route to get all subscribers
router.get('/subscribers',protect, admin, getAllSubscribers);

// POST route to send email to all subscribers
router.post('/send-offers',protect, admin, sendOffersToAllSubscribers);

router.post('/send-newProduct-offer',protect, admin, sendNewProductToAllSubscribers);

router.post('/share-chat',protect, sendChatToAdmin);

export default router;