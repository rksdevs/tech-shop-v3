import express from "express";
import { addInstagramPost, deleteInstagramPost, getAboutAdmin, updateAboutAdmin, updateInstagramPost, upload, uploadImage } from "../controller/aboutAdminController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Define the route to get the AboutAdmin document
router.get('/aboutAdmin', getAboutAdmin);

// Define the route to update the AboutAdmin document
router.put('/aboutAdmin', protect, admin, updateAboutAdmin);

// Define the route to add a new post to the instagramPosts array
router.post('/aboutAdmin/instagramPosts', protect, admin, addInstagramPost);

// Define the route to delete a post from the instagramPosts array
router.delete('/aboutAdmin/instagramPosts/:postId', protect, admin, deleteInstagramPost);

router.post("/aboutAdmin/uploadPostImg", upload.single('image'), uploadImage)

// Define the route to delete a post from the instagramPosts array
router.put('/aboutAdmin/instagramPosts/:postIdentifierId', protect, admin, updateInstagramPost);

export default router;

