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
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://bloodbond-blood-donation-webapp-using-vlhk.onrender.com/", // "http://localhost:5173",
    credentials: true,
  })
);
// // {
//   origin: "http://localhost:5173",
//   credentials: true,
// }

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/rewards", rewardRoutes);
app.use("/api/v1/campaigns", campaignRoutes);
app.use("/api/v1/emergencyRequest", emergencyRoutes);
app.get("/api/v1/donors", verifyToken, getAllDonors);
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("Server is running");
});
