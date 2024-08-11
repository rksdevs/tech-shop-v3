import asyncHandler from "../middlewares/asyncHandler.js";
import Newsletter from "../models/newsLetterModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const subscribeToNewsletter = asyncHandler(async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if email already exists
      const existingSubscriber = await Newsletter.findOne({ email });
      if (existingSubscriber) {
        return res.status(400).json({ message: 'Email is already subscribed.' });
      }
  
      // Create new subscriber
      const newSubscriber = new Newsletter({ email });
      await newSubscriber.save();
      
      res.status(201).json({ message: 'Subscribed successfully!' });
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'An error occurred while subscribing.', error });
    }
});

export const deleteSubscriber = asyncHandler(async (req, res) => {
    const { email } = req.body;
  
    try {
      const result = await Newsletter.findOneAndDelete({ email });
      if (!result) {
        return res.status(404).json({ message: 'Subscriber not found.' });
      }
  
      res.status(200).json({ message: 'Subscriber deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while deleting the subscriber.', error });
    }
});

export const getAllSubscribers = asyncHandler(async (req, res) => {
    try {
      const subscribers = await Newsletter.find({});
      res.status(200).json(subscribers);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching the subscribers.', error });
    }
});

export  const sendOffersToAllSubscribers = async (req, res) => {
    const {offerName} = req.body;
  
    try {
      const subscribers = await Newsletter.find({});
      const emailList = subscribers?.map(subscriber => subscriber?.email);
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_USER_EMAIL,
            pass: process.env.GOOGLE_USER_PASS
        }
      });
  
      const mailOptions = {
        from: process.env.GOOGLE_USER_EMAIL,
        to: emailList,
        subject: `New Offer From Tech-shop: ${offerName}`,
        text: `Hello subscriber, there is a new offer: ${offerName} at Tech Shop. Visit our website now!`,
        html:'<a href="https://rksdevs.in" target="_blank">Tech Shop</a>',
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'An error occurred while sending the email.', error });
        } else {
          res.status(200).json({ message: 'Emails sent successfully!', info });
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while sending emails to subscribers.', error });
    }
};

export  const sendNewProductToAllSubscribers = async (req, res) => {
    const {productDetails} = req.body;
  
    try {
      const subscribers = await Newsletter.find({});
      const emailList = subscribers?.map(subscriber => subscriber?.email);
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_USER_EMAIL,
            pass: process.env.GOOGLE_USER_PASS
        }
      });
  
      const mailOptions = {
        from: process.env.GOOGLE_USER_EMAIL,
        to: emailList,
        subject: `New Product Arrivals at Tech Shop`,
        text: `Hello subscriber, we have added new product/s: ${productDetails} at Tech Shop. Visit our website now!`,
        html:'<a href="https://rksdevs.in" target="_blank">Tech Shop</a>',
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'An error occurred while sending the email.', error });
        } else {
          res.status(200).json({ message: 'Emails sent successfully!', info });
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while sending emails to subscribers.', error });
    }
};