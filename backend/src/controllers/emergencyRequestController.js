import sharp from "sharp";
import EmergencyRequest from "../models/emergency_request.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/user.js";
export const resizeReport = async (req, res, next) => {
  if (!req.file) return next();
  req.body.report = `report--${Date.now()}-${req.body.patient_name}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/${req.body.report}`);

  next();
};

export const createEmergencyRequest = async (req, res) => {
  try {
    const {
      deadline,
      patient_name,
      medical_condition,
      description,
      blood_group,
    } = req.body;
    console.log(req.body);
    const upload = await cloudinary.uploader.upload(
      `public/img/${req.body.report}`
    );
    const medical_report = upload.secure_url;
    const hospital = req.user._id;
    const request = EmergencyRequest({
      deadline,
      patient_name,
      medical_condition,
      description,
      blood_group,
      medical_report,
      hospital,
    });
    if (!request) {
      return res.status(404).json({ message: "Error creating Request" });
    }
    await request.save();
    return res
      .status(200)
      .json({ message: "Request created sucessfully", request });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

//delete request , mark accepted , mark donated , all active request ,
//
export const deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const hospitalId = req.user._id;
    await EmergencyRequest.findByIdAndDelete(requestId, {
      hospital: hospitalId,
    });
    return res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

//get all active request

export const getAllActiveRequest = async (req, res) => {
  try {
    const requests = await EmergencyRequest.find({
      $or: [{ donor: { $exists: false } }, { donor: null }],
    }).populate({
      path: "hospital",
      select: "name city profilePic phone_number",
    });
    res.status(200).json({ length: requests.length, requests });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const markAccepted = async (req, res) => {
  try {
    const userId = req.user._id;

    const { requestId } = req.params;
    const request = await EmergencyRequest.findById(requestId);

    if (req.user.bloodGroup !== request.blood_group) {
      return res.status(400).json({ message: "Blood Group does not match" });
    }

    if (!request.donor) {
      request.donor = userId;
      await request.save();

      return res.status(200).json({ message: "Request Accepted!Be quick!" });
    } else {
      return res.status(400).json({ message: "Request already accpeted" });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const markDonated = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await EmergencyRequest.findById(requestId);

    if (!request.donor) {
      return res
        .status(200)
        .json({ message: "Donor hasnot accepted the request yet" });
    } else if (request.donated) {
      return res.status(200).json({ message: "Already donated" });
    } else if (request.hospital.equals(req.user._id)) {
      request.donated = true;
      const userId = request.donor;
      await request.save();
      await User.findByIdAndUpdate(userId, { $inc: { reward: 100 } });
      return res.status(200).json({ message: "Donor donated blood!!" });
    } else {
      return res.status(200).json({ message: "Unable to mark donated" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const getRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await EmergencyRequest.findById(requestId)
      .populate({
        path: "hospital",
        select: "name city profilePic phone_number",
      })
      .populate({
        path: "donor",
        select: "name phone_number",
      });
    if (request) {
      res.status(200).json({ message: "Request Fetched", data: request });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
