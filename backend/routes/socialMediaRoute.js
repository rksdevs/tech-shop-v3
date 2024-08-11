import express from "express";
import { getChannelVideos, getInstaTopPosts, getInstagramProfileDetails, instaProxy } from "../controller/socialMediaController.js";

const router = express.Router();

router.get("/getYoutube", getChannelVideos);
router.get("/instaProfileDetails", getInstagramProfileDetails);
router.get("/instaTopPosts", getInstaTopPosts);
router.get("/proxy", instaProxy)

export default router;