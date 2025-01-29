import express from "express";

import { upload } from "../utils/multer.js";
import {
  signUp,
  resizeProfileImage,
  login,
  getRewards,
  getRedeemed,
  getCampaigns,
  getRequests,
  getUser,
  logout,
} from "../controllers/userController.js";
import { validateToken } from "../controllers/userController.js";
import verifyToken from "../utils/verfiyToken.js";
import { restrictTo } from "../utils/restrictionAcess.js";

const router = express.Router();
router.route("/").get(verifyToken, getUser);
router
  .route("/signup")
  .post(upload.single("imageFile"), resizeProfileImage, signUp);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/validate-user").get(verifyToken, validateToken);

//rewards
router.route("/rewards").get(verifyToken, getRewards);
router.route("/redeemed").get(verifyToken, restrictTo("Donor"), getRedeemed);

//campaigns
router.route("/campaigns/:history?").get(verifyToken, getCampaigns);
router.route("/request/:history?").get(verifyToken, getRequests);
export default router;
