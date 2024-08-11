import express from "express";
const router = express.Router();
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUserByID, getUsers, updateUser, deleteUser, validateUserEmail, forgotPasswordOtpGeneration, otpVerification, updatePassword,  } from "../controller/userController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

//get all users - admin
router.get("/", protect, admin, getUsers);

//login or auth
router.post("/auth", authUser);

//register user
router.post("/", registerUser);

//logout user
router.post("/logout", logoutUser);

//get user profile - by user
router.get("/profile", protect, getUserProfile)

//update user profile by user - private
router.put("/profile", protect, updateUserProfile);

//get user by id - admin
router.get("/:id", protect, admin, getUserByID);

//delete user -- admin
router.delete("/:id", protect, admin, deleteUser);

//update user -- admin
router.put("/:id", protect, admin, updateUser);

//validate user email
router.post("/forget-password/validate-email", validateUserEmail);

//generate otp
router.post("/forget-password/otp-generation", forgotPasswordOtpGeneration);

//verify otp
router.post("/forget-password/otp-verification", otpVerification);

//update Password
router.post("/forget-password/update-password", updatePassword);

export default router;