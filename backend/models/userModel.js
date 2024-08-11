import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: Number,
        unique: true
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, // Allows multiple documents without googleId
    },
    temporaryOtp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    otpRequestCount: { type: Number, default: 0 },
    otpLastRequest: { type: Date },
    otpLockUntil: { type: Date },
    gptRequestCount: { type: Number, default: 15 },
    gptLastRequest: { type: Date },
    gptLockUntil: { type: Date },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {timestamps: true})

// Method to hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  // Method to match password
  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

const User = mongoose.model("User", userSchema);

export default User;