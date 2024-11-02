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
    threadId: { type: String },
    messageList:[{
        role: {type: String, required: true},
        value: {type: String, required: true}
    }],
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

//method to restrict the message list to max 5 
// Pre-save middleware to check the length of messageList
userSchema.pre('save', function (next) {
    const user = this;
  
    // Check if the length of messageList exceeds 5
    if (user.messageList.length > 5) {
      // Remove the first element (FIFO)
      user.messageList.shift();
    }
  
    next(); // Continue saving the document
});
const User = mongoose.model("User", userSchema);

export default User;