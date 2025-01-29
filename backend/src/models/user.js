import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    // required: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  phone_number: {
    type: Number,
    unique: true,
    required: [true, "Phone number is required"],
  },
  DOB: {
    type: Date,
    // required: [true, "DOB is required"],
  },
  profilePic: {
    type: String,
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    // required: true,
  },
  role: {
    type: String,
    enum: ["Donor", "Hospital"],
    required: [true, "Role is required"],
  },
  lastDonated: {
    type: Date,
    default: null,
  },
  reward: {
    type: Number,
    default: 0,
  },
  totalDonation: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
