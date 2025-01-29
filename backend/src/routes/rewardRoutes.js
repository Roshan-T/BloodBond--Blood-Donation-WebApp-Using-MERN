import express from "express";
import verifyToken from "../utils/verfiyToken.js";
import { restrictTo } from "../utils/restrictionAcess.js";
import {
  createReward,
  redeemReward,
  markRewardUsedDonor,
  getAllRewards,
  getSingleReward,
} from "../controllers/rewardControllers.js";
const router = express.Router();
router
  .route("/")
  .post(verifyToken, restrictTo("Hospital"), createReward)
  .get(getAllRewards);
router.route("/:id").get(getSingleReward);
router.route("/redeem/:id").put(verifyToken, restrictTo("Donor"), redeemReward);
router
  .route("/markUsed/reward/:rewardId/user/:userId")
  .put(verifyToken, restrictTo("Hospital"), markRewardUsedDonor);
export default router;
