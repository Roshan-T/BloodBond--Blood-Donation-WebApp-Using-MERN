import sharp from "sharp";
import Campaign from "../models/campaigns.js";
import User from "../models/user.js";
import cloudinary from "../utils/cloudinary.js";

export const resizeBanner = async (req, res, next) => {
  if (!req.file) return next();
  req.body.banner = `banner--${Date.now()}-${req.body.name}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/${req.body.banner}`);

  next();
};

export const createCampagin = async (req, res) => {
  try {
    const { name, description, address, start_time, end_time } = req.body;
    const upload = await cloudinary.uploader.upload(
      `public/img/${req.body.banner}`
    );
    const banner = upload.secure_url;
    const hospital = req.user._id;
    const campaign = Campaign({
      hospital,
      banner,
      name,
      description,
      address,
      start_time,
      end_time,
    });
    if (!campaign) {
      return res.status(404).json({ message: "Error creating Campaign" });
    }
    await campaign.save();
    return res
      .status(200)
      .json({ message: "Campaigns created sucessfully", campaign });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
//intrested
import mongoose from "mongoose";
export const intrestedAdd = async (req, res) => {
  try {
    const userId = req.user._id;
    const { campaignId } = req.params;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    if (campaign.interested_donors.includes(userId)) {
      return res.status(400).json({ message: "Already marked as interested" });
    } else {
      campaign.interested_donors.push(userId);
      await campaign.save();

      return res.status(201).json({ message: "Successfully marked intrested" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
//mark donated
export const markDonated = async (req, res) => {
  try {
    const { campaignId, userId } = req.params;

    const campaign = await Campaign.findById(campaignId);
    const user = await User.findById(userId);
    if (!campaign) {
      return res.status(400).json({ message: "Campgain not found" });
    }
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (campaign.donated_donors.includes(userId)) {
      return res.status(200).json({ message: "Already donated" });
    } else if (!campaign.interested_donors.includes(userId)) {
      return res
        .status(200)
        .json({ message: "Donor does not mark himself intrested" });
    } else {
      campaign.donated_donors.push(userId);
      user.reward += 100;
      user.lastDonated = new Date();
      await user.save();
      await campaign.save();
      res.status(201).json({ message: "Donor marked as donated" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
//delete campaign

export const deleteCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    await Campaign.findByIdAndDelete(campaignId, { hospital: req.user._id });
    return res.status(201).json({ message: "Campaign deleted sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const getAllCampaigns = async (req, res) => {
  try {
    const currentTime = new Date();
    const campaigns = await Campaign.find({
      end_time: { $gt: currentTime },
    });
    return res.status(200).json({ length: campaigns.length, campaigns });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const getCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const campaign = await Campaign.findById(campaignId)
      .populate({
        path: "hospital",
        select: "name city",
      })
      .populate({
        path: "interested_donors",
        select: "name profilePic phone_number bloodGroup",
      })
      .populate({
        path: "donated_donors",
        select: "name profilePic phone_number bloodGroup",
      });

    return res.status(200).json({ campaign });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
