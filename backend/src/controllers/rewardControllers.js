import mongoose from "mongoose";
import Reward from "../models/reward.js";
import User from "../models/user.js";

//HOSPITALS
export const createReward = async (req, res) => {
  try {
    const {
      title: name,
      total_claims: quantity,
      description,
      points_required,
    } = req.body;
    console.log(req.body);
    const reward = Reward({
      name,
      quantity,
      description,
      points_required,
      hospitalId: req.user._id,
    });
    await reward.save();

    res
      .status(200)
      .json({ message: "Reward created succesfully", data: reward });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
// export const deleteReward = async (req, res) => {
//   try {
//     const rewardId = req.params;
//     const reward = await Reward.findByIdAndDelete(rewardId);
//     if (!reward) {
//       return res.status(400).send({ message: "Reward don't exists" });
//     }
//     return res.status(203).send({ message: "Reward deleted successfully" });
//   } catch (error) {}
// };

export const markRewardUsedDonor = async (req, res) => {
  try {
    const { rewardId, userId } = req.params;

    const hospitalId = req.userId;
    const reward = await Reward.findById(rewardId);
    if (!reward) {
      return res.status(400).send({ message: "Reward don't exists" });
    }
    const orgHospitalId = reward.hospitalId;
    if (orgHospitalId.toString() !== hospitalId) {
      return res.status(404).send({ message: "Unauthorized" });
    }
    reward.redeemed_donors.push(userId);
    await reward.save();
    return res.status(201).json({ message: "User used his reward" }, reward);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
//DONORS
export const redeemReward = async (req, res) => {
  try {
    let { id: rewardId } = req.params;

    const userId = req.userId;

    const user = await User.findById(userId).select("reward");

    const { _id, reward: availablePoints } = user;
    const reward = await Reward.findById(rewardId);

    if (!reward) {
      return res.status(400).send({ message: "Reward don't exists" });
    }

    if (reward.quantity === reward.usedQuantity) {
      return res.status(400).json({ message: "Reward Quantity is reached" });
    }
    if (reward.points_required > availablePoints) {
      return res
        .status(400)
        .json({ message: "You dont have sufficient points to redeem" });
    }
    if (!reward.all_donors.includes(userId)) {
      reward.all_donors.push(userId);
      reward.usedQuantity += 1;
      user.reward -= reward.points_required;
      await user.save();

      await reward.save();
      return res
        .status(201)
        .json({ message: "You have redeemed the reward.Enjoy!" });
    } else {
      return res
        .status(400)
        .json({ message: "You have already redemeed this reward" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({
      $expr: { $ne: ["$quantity", "$usedQuantity"] },
    });
    return res.status(201).json({ length: rewards.length, rewards });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getSingleReward = async (req, res) => {
  try {
    const { id } = req.params;
    const reward = await Reward.findById(id)
      .populate({
        path: "all_donors",
        select: "name profilePic phone_number bloodGroup",
      })
      .populate({
        path: "redeemed_donors",
        select: "name profilePic phone_number bloodGroup",
      });
    return res.status(201).json(reward);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
