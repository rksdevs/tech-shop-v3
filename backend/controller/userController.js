import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";
import firebaseAdmin from "firebase-admin";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   public
const authUser = asyncHandler(async(req, res)=>{
    const {email, password, googleToken} = req.body;

    const user = await User.findOne({email});

    if(googleToken) {
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(googleToken);
      const uid = decodedToken.uid;

      let googleUser = await User.findOne({ googleId: uid });

      if (!googleUser) {
        googleUser = await User.create({
            name: decodedToken.name,
            email: decodedToken.email,
            googleId: uid, 
          });
      }

      generateToken(res, googleUser._id);
      res.status(200).json({
        _id: googleUser._id,
        email: googleUser.email,
        name: googleUser.name,
        isAdmin: googleUser.isAdmin,
        gptRequestCount: googleUser?.gptRequestCount,
      });
    } catch (error) {
      console.error('Error verifying Google token:', error.code, error.message);
      res.status(401);
      throw new Error('Invalid Google token');
    }
    } else {
        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id);
    
            res.status(200).json({
                _id: user._id,
                email: user.email,
                name: user.name,
                contact: user?.contactNumber,
                isAdmin: user.isAdmin,
                gptRequestCount: user?.gptRequestCount
            })
        } else{
            res.status(401);
            throw new Error ('Invalid email or password')
        }
    }
})

// @desc     Register user 
// @route    POST /api/users
// @access   public
const registerUser = asyncHandler(async(req, res)=>{
    // res.send("Register user");
    const {name, email, password, contactNumber, googleId} = req.body;

    //if the user exists
    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400);
        throw new Error ('User already exists! Please login instead')
    }

    //if user doesnt exist create new user
    const user = await User.create({
        name,
        email,
        password,
        contactNumber,
        googleId
    })

    //send user data as json
    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            gptRequestCount: user?.gptRequestCount,
            googleId: user?.googleId,
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

// @desc     Logout and delete token
// @route    POST /api/users/logout
// @access   Private
const logoutUser = asyncHandler(async(req, res)=>{
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'Logged out successfully!'})
})

// @desc     Get user profile
// @route    GET /api/users/profile
// @access   public
const getUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id)

    if (user) {
        res.status(200).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            gptRequestCount: user?.gptRequestCount,
            gptLastRequest: user?.gptLastRequest,
        })
    } else {
        res.status(400);
        throw new Error('User not found!')
    }
})

// @desc     update user
// @route    PUT /api/users/profile
// @access   private
const updateUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(400);
        throw new Error ('User not found!')
    }
})

// @desc     Get All users
// @route    GET /api/users
// @access   private/admin
const getUsers = asyncHandler(async(req, res)=>{
    const users = await User.find({});
    res.status(200).json(users);
})

// @desc     Get user By Id
// @route    GET /api/users/:id
// @access   private/admin
const getUserByID = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id).select('-password');

    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found!');
    }
})

// @desc     Delete users
// @route    DELETE /api/users/:id
// @access   private/admin
const deleteUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id);

    if(user) {
        if(user.isAdmin) {
            res.status(400);
            throw new Error('Cannot delete an admin user!')
        }

        await User.deleteOne({_id: user._id});
        res.status(200).json({message: 'User deleted successfully'});
    } else {
        res.status(404);
        throw new Error('User not found!');
    }
})

// @desc     Update user
// @route    PUT /api/users/:id
// @access   private/admin
const updateUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            gptRequestCount: user?.gptRequestCount
        })
    } else {
        res.status(404);
        throw new Error('User not found!');
    }
})

const validateUserEmail = asyncHandler(async(req,res)=>{
    const {emailToValidate} = req.body;
    try {
        const user = await User.findOne({email: emailToValidate});

        if(user?.googleId) {
            res.status(400).json({message: "This is a google account, reset your google password!"})
        }

        if(user) {
            const now = new Date();
            if (user.otpLastRequest && now - user.otpLastRequest > 60 * 60 * 1000) {
                user.otpRequestCount = 0;
            }
            await user.save();
            res.status(200).json({userId: user?._id, otpRequestCount: user?.otpRequestCount, emailEnd: user?.email.split("@")[1]})
        } else {
            res.status(404).json({
                message: "Can't find user with this email."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error('Something went wrong!');
    }
})

const forgotPasswordOtpGeneration = asyncHandler(async(req, res) => {
    // Function to generate a 6-digit OTP
    const {userId} = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    
    const now = new Date();

    // Check if the user is locked
    if (user.otpLockUntil && user.otpLockUntil > now) {
        return res.status(429).json({ message: 'Too many requests. Please try again later.' });
    }

    // Reset the request count if the last request was more than an hour ago
    if (user.otpLastRequest && now - user.otpLastRequest > 60 * 60 * 1000) {
        user.otpRequestCount = 0;
    }

     // Increment the request count
    user.otpRequestCount = (user.otpRequestCount || 0) + 1;
    user.otpLastRequest = now;

    // Lock the user if they have exceeded the limit
    if (user.otpRequestCount > 3) {
        user.otpLockUntil = new Date(now.getTime() + 60 * 60 * 1000); // Lock for 1 hour
        await user.save();
        return res.status(429).json({ message: 'Too many requests. Please try again later.' });
    }
      
    function generateOTP() {
        // Generate a random 6-digit number
        return Math.floor(100000 + Math.random() * 900000);
    }

    // Function to generate OTP and set expiry time
    function generateOTPWithExpiry() {
        const otp = generateOTP();
        const expiryTime = new Date(Date.now() + (10 * 60 * 1000)); // Example: 10 minutes from now

        return { otp: otp, expiryTime: expiryTime };
    }

    // Example usage
    const { otp, expiryTime } = generateOTPWithExpiry();
    
   // Update userModel document with new OTP, expiry, and request tracking fields
  user.temporaryOtp = otp;
  user.otpExpiry = expiryTime;

  await user.save()
    .then(updatedUser => {
      // Send email with OTP
      sendOTPEmail(user?.email, otp, user?.name);
      res.status(200).json({ proceed: true, otpRequestCount: user?.otpRequestCount, message: 'OTP sent to registered email address' });
    })
    .catch(err => {
      console.error('Error updating user:', err);
      res.status(400).json({ proceed: false, message: 'Something went wrong, try again' });
    });
})

const otpVerification = asyncHandler(async(req,res)=>{
    const {otp, userId} = req.body;
    try {
        const user = await User.findById(userId);
        if(!user) {
            res.status(400)
            throw new Error('Invalid user');
        } else {
            //check expiry time
            if(user?.otpExpiry > Date.now()) {
                if(user?.temporaryOtp === otp) {
                    res.status(200).json({
                        proceed: true
                    })
                } else {
                    res.status(400).json({proceed: false, message: "Invalid OTP"})
                }
            } else {
                res.status(400).json({proceed: false, message: "OTP Expired, generate new OTP"})
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500)
        throw new Error('Something went wrong!')
    }
})

// Create a Nodemailer transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_USER_EMAIL,
        pass: process.env.GOOGLE_USER_PASS
    }
});

// Function to send OTP via email
function sendOTPEmail(email, otp, name) {
    let mailOptions = {
        from: process.env.GOOGLE_USER_EMAIL,
        to: email,
        subject: 'Computermakers Password Reset OTP',
        text: `Hi ${name}, your OTP for password reset is: ${otp}. Please use it within 10 minutes. This email address is not monitored, please do not reply you will not receive any response.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const updatePassword = asyncHandler(async (req, res) => {
    const { userId, newPassword } = req.body;
    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update the user's password
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500)
        throw new Error('Something went wrong! Here is a pancake')
    }
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUserByID,
    getUsers,
    updateUser,
    deleteUser,
    validateUserEmail,
    forgotPasswordOtpGeneration,
    otpVerification,
    updatePassword  
};