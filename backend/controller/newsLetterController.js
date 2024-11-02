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
        subject: `New Offer From Computermakers: ${offerName}`,
        text: `Hello subscriber, there is a new offer: ${offerName} at Computermakers. Visit our website now!`,
        html:'<a href="https://rksdevs.in" target="_blank">Computermakers</a>',
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
        subject: `New Product Arrivals at Computermakers`,
        text: `Hello subscriber, we have added new product/s: ${productDetails} at Computermakers. Visit our website now!`,
        html:'<a href="https://rksdevs.in" target="_blank">Computermakers</a>',
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

export  const sendChatToAdmin = async (req, res) => {
  const {chatDetails, userName, userContact} = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.GOOGLE_USER_EMAIL,
          pass: process.env.GOOGLE_USER_PASS
      }
    });

    let sample = [
      {
        "role": "user",
        "value": "HALO, pick a 27 inch gaming monitor for me!"
      },
      {
        "role": "assistant",
        "value": "Certainly, Admin User! Here’s a great option for a 27-inch gaming monitor that should enhance your gaming experience:\n\n### Recommended 27-inch Gaming Monitor\n\n**ASUS ROG Strix XG279Q**\n- **Screen Size**: 27 inches\n- **Resolution**: 2560 x 1440 (QHD)\n- **Refresh Rate**: 170Hz (overclocked), with 1ms response time (MPRT)\n- **Panel Type**: IPS, which offers vibrant colors and wide viewing angles\n- **Adaptive Sync**: Compatible with NVIDIA G-SYNC and AMD FreeSync for smooth gameplay\n- **Price**: Approximately ₹30,000 to ₹38,000\n\n### Key Features:\n- The high refresh rate and quick response time make it perfect for competitive gaming and fast-paced titles.\n- QHD resolution gives you sharp visuals and maintain high performance with your gaming setup.\n\nPlease check the latest prices and availability on the computermakers.in website, as they may vary. If you need more options or further assistance, feel free to ask!"
      }
    ]

    // Function to format the chat for the email body
    const formatChatForEmail = (chat) => {
      return chat
        .map((message) => {
          return `${message.role === 'user' ? 'User' : 'Assistant'}:\n${message.value}\n`;
        })
        .join('\n'); // Join with double line breaks for spacing
    };

    const mailOptions = {
      from: process.env.GOOGLE_USER_EMAIL,
      to: process.env.GOOGLE_USER_EMAIL,
      subject: `Chat Share By User: ${userName} & Contact: ${userContact}`,
      text: formatChatForEmail(chatDetails),
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