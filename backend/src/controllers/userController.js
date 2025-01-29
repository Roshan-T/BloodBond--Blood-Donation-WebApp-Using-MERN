import sharp from "sharp";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import cloudinary from "../utils/cloudinary.js";
import Reward from "../models/reward.js";
import Campaign from "../models/campaigns.js";
import EmergencyRequest from "../models/emergency_request.js";

const generateToken = async (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};
export const resizeProfileImage = async (req, res, next) => {
  if (!req.file) return next();
  req.body.profilePic = `profilePic--${Date.now()}-${req.body.email}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/${req.body.profilePic}`);

  next();
};

export const validateToken = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (req.userId) {
      return res.status(200).json({ user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const {
    email,
    name,
    password,
    confirm_password,
    longitude,
    latitude,
    gender,
    city,
    phone_number,
    date: DOB,
    bloodGroup,
    role,
  } = req.body;
  try {
    if (password !== confirm_password) {
      return res.status(404).json({ message: "Password are not correct" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(404)
        .json({ message: "User with this email already exists" });
    }
    const upload = await cloudinary.uploader.upload(
      `public/img/${req.body.profilePic}`
    );
    const profilePic = upload.secure_url;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User({
      email,
      name,
      password: hashedPassword,
      longitude,
      latitude,
      city,
      phone_number,
      gender,
      DOB,
      bloodGroup,
      profilePic,
      role,
    });

    if (!newUser) {
      return res.status(404).json({ message: "Error creating User" });
    }
    await newUser.save();

    const token = await generateToken(newUser._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 604800000,
    });
    res.status(201).json({
      message: "Registered successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  //extract username password ,find user ,  compare password , if correct set cookie and send response
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Usser not found with this email`" });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      const token = await generateToken(user._id);
      res.cookie("jwt", token, {
        path: "/",
        httpOnly: true,
        sameSite: "None",
        secure: true, // process.env.NODE_ENV === "production",
        maxAge: 604800000,
      });

      return res.status(200).json({
        message: "Logged in Successfully",
        user: user,
      });
    }
    return res.status(404).json({ message: "Unauthorized" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the jwt cookie
    res.cookie("jwt", "", {
      path: "/",
      httpOnly: true,
      sameSite: "None",
      secure: true, // process.env.NODE_ENV === "production",
      expires: new Date(0), // Set expiration to a past date to clear the cookie
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

//REWARDS

export const getRewards = async (req, res) => {
  try {
    const user = req.user;
    //for hospital give all its rewards created by them
    //for donor give all the available rewards .i.e usedQuantity != totalQuantity
    //hospital
    if (user.role === "Hospital") {
      const rewards = await Reward.find({ hospitalId: req.user._id })
        .populate({
          path: "all_donors",
          select: "name  profilePic",
        })
        .populate({
          path: "redeemed_donors",
          select: "name  profilePic",
        })
        .populate({
          path: "hospitalId",
          select: "name",
        });

      const length = rewards.length;
      return res.status(200).json({ length, rewards });
    } else if (user.role === "Donor") {
      const rewards = await Reward.find({
        $expr: { $ne: ["$quantity", "$usedQunatity"] },
      })
        .select("_id name quantity usedQuantity description points_required ")
        .populate({
          path: "hospitalId",
          select: "name",
        });
      const length = rewards.length;

      return res.status(200).json({
        length,
        rewards,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

//for donor get the redeemed rewards
export const getRedeemed = async (req, res) => {
  try {
    const rewards = await Reward.aggregate([
      {
        $match: {
          $or: [
            { all_donors: req.user._id },
            { redeemed_donors: req.user._id },
          ],
        },
      },
      {
        $addFields: {
          isRedeemed: {
            $and: [
              { $in: [req.user._id, "$all_donors"] },
              {
                $in: [req.user._id, "$redeemed_donors"],
              },
            ],
          },
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          points_required: 1,
          isRedeemed: 1,
          hospitalId: 1,
        },
      },
    ]);

    const populatedReward = await Reward.populate(rewards, {
      path: "hospitalId",
      select: "name",
    });

    const length = populatedReward.length;
    return res.status(200).json({
      length,
      reward: populatedReward,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

//CAMPAIGNS
//HOSPITAL GETS ALL HIS CAMPAIGNS IT CREATED AND HISTORY
//history is those whose end date extend the present date
//active those with in the time
export const getCampaigns = async (req, res) => {
  try {
    const role = req.user.role;

    if (role === "Donor") {
      const donorId = req.user._id;
      const campaigns = await Campaign.aggregate([
        {
          $match: {
            $or: [{ interested_donors: donorId }, { donated_donors: donorId }],
          },
        },
        {
          $addFields: {
            isDonated: {
              $and: [
                { $in: [donorId, "$donated_donors"] },
                { $in: [donorId, "$interested_donors"] },
              ],
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "hospital",
            foreignField: "_id",
            as: "hospital_info",
          },
        },

        {
          $project: {
            name: 1,
            description: 1,
            banner: 1,
            address: 1,
            hospital_info: { name: 1 },
            isDonated: 1,
            start_time: 1,
            interested_donors: 1,
            donated_donors: 1,
          },
        },
      ]);
      res.status(200).json({ campaigns, length: campaigns.length });
    } else if (role === "Hospital") {
      const hospitalId = req.user._id;
      const { history } = req.params;
      const currentTime = new Date();
      let campaigns;
      if (history === "true") {
        campaigns = await Campaign.find({
          hospital: hospitalId,

          end_time: { $lt: currentTime },
        })
          .sort({ end_time: 1 })
          .populate({
            path: "interested_donors",
            select: "-password -reward ",
          })
          .populate({
            path: "donated_donors",
            select: "-password -reward ",
          });
      } else {
        campaigns = await Campaign.find({
          hospital: hospitalId,

          end_time: { $gt: currentTime },
        })
          .sort({ end_time: 1 })
          .populate({
            path: "interested_donors",
            select: "-password -reward ",
          })
          .populate({
            path: "donated_donors",
            select: "-password -reward ",
          });
      }

      return res.status(201).json({ length: campaigns.length, campaigns });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

//Emergency Request

export const getRequests = async (req, res) => {
  try {
    const role = req.user.role;

    if (role === "Donor") {
      const requests = await EmergencyRequest.find({
        donor: req.user._id,
      })
        .populate({ path: "hospital", select: "name city" })
        .populate({ path: "donor", select: "name" });
      return res.status(200).json({ length: requests.length, requests });
    } else if (role === "Hospital") {
      const { history } = req.params;
      const currentTime = new Date();
      if (history === "true") {
        const requests = await EmergencyRequest.find({
          hospital: req.user._id,
          $or: [
            { donated: true },
            {
              deadline: { $lt: currentTime },
            },
          ],
        })
          .populate({
            path: "donor",
            select: "name phone_number",
          })
          .populate({
            path: "hospital",
            select: "name",
          });
        return res.status(200).json({ length: requests.length, requests });
      }
      const requests = await EmergencyRequest.find({
        hospital: req.user._id,
        donated: false,
        deadline: { $gt: currentTime },
      }).populate({
        path: "hospital",
        select: "name",
      });
      return res.status(200).json({ length: requests.length, requests });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const getUser = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {}
};
