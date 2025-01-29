import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    usedQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    all_donors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    redeemed_donors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    points_required: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Reward = mongoose.model("Reward", rewardSchema);
export default Reward;
