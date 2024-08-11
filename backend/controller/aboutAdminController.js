import asyncHandler from "../middlewares/asyncHandler.js";
import AboutAdmin from "../models/aboutAdmin.js";
import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../utils/aws.S3bucket.js";
import mongoose from "mongoose";

// Controller function to update the AboutAdmin document
export const updateAboutAdmin = asyncHandler(async (req, res) => {
    try {
        const updateData = req.body;

        // Find the single document and update it, or create it if it doesn't exist
        const updatedDocument = await AboutAdmin.findOneAndUpdate(
            {},
            updateData,
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({
            message: 'AboutAdmin document updated successfully',
            data: updatedDocument
        });
    } catch (error) {
        res.status(500)
        throw new Error("Error updating admin details!")
    }
})

export const getAboutAdmin = asyncHandler(async (req, res) => {
    try {
        // Find the single document in the AboutAdmin collection
        const aboutAdminDocument = await AboutAdmin.findOne({});

        // If no document is found, send a 404 response
        if (!aboutAdminDocument) {
            return res.status(404).json({
                message: 'AboutAdmin document not found',
            });
        }

        // Send the found document as the response
        res.status(200).json({
            message: 'AboutAdmin document retrieved successfully',
            data: aboutAdminDocument
        });
    } catch (error) {
        res.status(500)
        throw new Error("Error getting admin details!")
    }
});

// Controller function to add a new post to the instagramPosts array
export const addInstagramPost = asyncHandler(async (req, res) => {
    try {
        const newPost = {
            postId: "0",
            postLikes: 0,
            postComments: 0,
            postImage: "https://computer-makers-products-cpu.s3.ap-south-1.amazonaws.com/1721547511780-placeholder.png"
        }

        // Find the single document and add the new post to the instagramPosts array
        const updatedDocument = await AboutAdmin.findOneAndUpdate(
            {},
            { $push: { instagramPosts: newPost } },
            { new: true }
        );

        res.status(200).json({
            message: 'New post added successfully',
            data: updatedDocument
        });
    } catch (error) {
        res.status(500)
        throw new Error("Error adding new posts!")
    }
});

// Controller function to delete a post from the instagramPosts array
export const deleteInstagramPost = asyncHandler(async (req, res) => {
    try {
        const { postId } = req.params;

        // Find the single document to get the image key
        const document = await AboutAdmin.findOne({});
        const post = document.instagramPosts.id(postId);

        if (!post) {
        res.status(404);
        throw new Error("Post not found");
        }

        if (post.postImage !== "https://computer-makers-products-cpu.s3.ap-south-1.amazonaws.com/1721547511780-placeholder.png") {
            const imageKey = post.postImage.split(".com/")[1]; 

            try {
                await s3.deleteObject({
                  Bucket: 'computer-makers-products-cpu',
                  Key: imageKey
                }).promise();
              } catch (s3Error) {
                console.error('Error deleting image from S3:', s3Error);
                res.status(500);
                throw new Error("Error deleting image from S3");
              }
        }
        // Find the single document and remove the post with the specified postId from the instagramPosts array
        const updatedDocument = await AboutAdmin.findOneAndUpdate(
            {},
            { $pull: { instagramPosts: { _id: postId } } },
            { new: true }
        );

        res.status(200).json({
            message: 'Post deleted successfully',
            data: updatedDocument
        });
    } catch (error) {
        res.status(500)
        throw new Error("Error deleting posts!")
    }
});

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'computer-makers-products-cpu',
        acl: 'public-read', // or private based on your use case
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname); // unique file name
        },
    })

})

export const uploadImage = asyncHandler(async(req,res)=>{
    // const signedUrl = generateSignedUrl(req.file.key);
    res.status(200).json({ message: 'Image uploaded successfully', data: req.file.location });
})

// Controller function to update a specific post in the instagramPosts array
export const updateInstagramPost = asyncHandler(async (req, res) => {
    try {
        const {postIdentifierId} = req.params;
        const updateData = req.body;

        // Check if the postId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(postIdentifierId)) {
            return res.status(400).json({ message: 'Invalid postId' });
        }

        // Find the document containing the post and update the specific post
        const updatedDocument = await AboutAdmin.findOneAndUpdate(
            { 'instagramPosts._id': postIdentifierId },
            { $set: { 'instagramPosts.$': updateData } },
            { new: true }
        );

        // If the document is not found, send a 404 response
        if (!updatedDocument) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({
            message: 'Post updated successfully',
            data: updatedDocument
        });
    } catch (error) {
        console.error('Update Error:', error.message);
        res.status(500).json({ message: 'Error updating the posts', error: error.message });
    }
});