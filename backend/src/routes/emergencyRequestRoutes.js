import express from "express";
import {
  createEmergencyRequest,
  deleteRequest,
  getAllActiveRequest,
  markAccepted,
  markDonated,
  resizeReport,
  getRequest,
} from "../controllers/emergencyRequestController.js";
import verifyToken from "../utils/verfiyToken.js";
import { restrictTo } from "../utils/restrictionAcess.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router
  .route("/")
  .post(
    verifyToken,
    restrictTo("Hospital"),
    upload.single("medical_report"),
    resizeReport,
    createEmergencyRequest
  )
  .get(getAllActiveRequest);

router
  .route("/:requestId")
  .delete(verifyToken, restrictTo("Hospital"), deleteRequest)
  .put(verifyToken, restrictTo("Donor"), markAccepted)
  .get(getRequest);
router
  .route("/donated/:requestId")
  .put(verifyToken, restrictTo("Hospital"), markDonated);
export default router;
