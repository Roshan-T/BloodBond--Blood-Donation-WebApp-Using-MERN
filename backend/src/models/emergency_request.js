import mongoose from "mongoose";

const emergencyRequestSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deadline: {
      type: Date,
      required: true,
    },
    medical_report: {
      type: String,
      required: true,
    },
    patient_name: {
      type: String,
      required: true,
    },
    medical_condition: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    donated: {
      type: Boolean,
      default: false,
    },
    blood_group: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
  },
  { timestamps: true }
);

const EmergencyRequest = mongoose.model(
  "EmergencyRequest",
  emergencyRequestSchema
);

export default EmergencyRequest;
