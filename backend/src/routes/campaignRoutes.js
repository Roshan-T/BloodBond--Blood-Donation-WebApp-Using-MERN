import express from "express";
import verifyToken from "../utils/verfiyToken.js";
import { restrictTo } from "../utils/restrictionAcess.js";
import {
  createCampagin,
  resizeBanner,
  intrestedAdd,
  markDonated,
  deleteCampaign,
  getAllCampaigns,
  getCampaign,
} from "../controllers/campaignController.js";
import { upload } from "../utils/multer.js";
const router = express.Router();
router
  .route("/")
  .post(
    verifyToken,
    restrictTo("Hospital"),
    upload.single("banner"),
    resizeBanner,
    createCampagin
  )
  .get(getAllCampaigns);
router
  .route("/:campaignId")
  .delete(verifyToken, restrictTo("Hospital"), deleteCampaign)
  .get(getCampaign);
router
  .route("/intrested/:campaignId")
  .put(verifyToken, restrictTo("Donor"), intrestedAdd);

router
  .route("/mark/campaign/:campaignId/user/:userId")
  .put(verifyToken, restrictTo("Hospital"), markDonated);

export default router;
