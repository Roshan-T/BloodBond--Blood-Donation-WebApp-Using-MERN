import User from "../models/user.js";

export const getAllDonors = async (req, res) => {
  try {
    const userId = req.user._id;
    const donors = await User.find({ role: "Donor" }).select(
      "name city bloodGroup profilePic latitude longitude"
    );

    return res.status(200).json({ length: donors.length, donors });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
