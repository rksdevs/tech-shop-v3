import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectToDb from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import razorPayRoute from "./routes/rzpRoute.js";
import offerRoute from "./routes/offerRoute.js";
import prebuiltPcRoute from "./routes/preBuiltPcRoute.js";
import aboutAdminRoute from "./routes/aboutAdminRoute.js";
import newsLetterRoute from "./routes/newsLetterRoute.js";
import shipRocketRoute from "./routes/shiprocketRoutes.js";
import performanceCalculatorRoute from "./routes/performanceCalculatorRoute.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import socialMediaRoute from "./routes/socialMediaRoute.js";
import getProductImageRoute from "./utils/aws.S3bucket.js";
import cors from "cors";
import firebaseAdmin from "firebase-admin";

connectToDb(); //Connection to DB
const port = process.env.PORT || 6001;
const app = express();

// Firebase Admin setup
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const corsOptions = {
  origin: "*", // change it based on prod or dev env
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/razorpay", razorPayRoute);
app.use("/api/offers", offerRoute);
app.use("/api/prebuiltPc", prebuiltPcRoute);
app.use("/api/calculatePerformance", performanceCalculatorRoute);
app.use("/api/socialMediaDetail", socialMediaRoute);
app.use("/api/getImage", getProductImageRoute);
app.use("/api/update-admin", aboutAdminRoute);
app.use("/api/newsLetter", newsLetterRoute);
app.use("/api/shipRocket", shipRocketRoute);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve(); //set __dirname to current directory;
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  //any routes which is not listed in the api will be redirect to index page
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
