import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

//routes
import userRoutes from "./routes/userRoutes.js";
import rewardRoutes from "./routes/rewardRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import emergencyRoutes from "./routes/emergencyRequestRoutes.js";
import verifyToken from "./utils/verfiyToken.js";
import { getAllDonors } from "./controllers/donorControllres.js";

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log("Mongodb connected successfully");
}

connectDB();
const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://bloodbond-blood-donation-webapp-using-2n4y.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Request Origin:", origin); // Debugging
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin); // Set the specific origin
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/rewards", rewardRoutes);
app.use("/api/v1/campaigns", campaignRoutes);
app.use("/api/v1/emergencyRequest", emergencyRoutes);
app.get("/api/v1/donors", verifyToken, getAllDonors);
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("Server is running");
});
