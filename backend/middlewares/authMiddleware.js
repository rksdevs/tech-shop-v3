import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//protect middleware
const protect = asyncHandler(async(req, res, next)=>{
    //we need to grab the token from cookie
    let token;

    token = req.cookies.jwt;

    if(token) {
        try {
            //verify the token - decode the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET) //this return an object with value userId as setup in the user controller
            req.user = await User.findById(decoded.userId).select('-password') //if token is verified set the user in the req body
            next(); 
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not Authorized! Invalid authorization token.')
        }   
    } else {
        //missing auth token
        res.status(401);
        throw new Error ('Not Authorized! Missing authorization token!')
    } 
})

//Admin middleware
const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error ('Not Authorized as an admin!') 
    }
}

export {admin, protect}