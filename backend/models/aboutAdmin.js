import mongoose from "mongoose";

const aboutAdminSchema = new mongoose.Schema({
    owner: {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "https://github.com/shadcn.png"
        }
    },
    coOwner: {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "https://github.com/shadcn.png"
        }
    },
    productExpert: {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "https://github.com/shadcn.png"
        }
    },
    instagramDetails: {
        posts: {
            type: Number,
            required: true,
        },
        followers: {
            type: Number,
            required: true,
        },
        following: {
            type: Number,
            required: true,
        },
    },
    instagramPosts: [{
        postImage: {
            type: String,
            required: true,
            default: "https://github.com/shadcn.png", 
        },
        postLikes: {
            type: Number,
            required: true,
        },
        postComments: {
            type: Number,
            required: true,
        },
        postId: {
            type: String,
            required: true,
            unique: true
        }
    }]
});

const AboutAdmin = mongoose.model("AboutAdmin", aboutAdminSchema);

export default AboutAdmin;