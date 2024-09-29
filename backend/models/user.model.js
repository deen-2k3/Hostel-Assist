import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "warden"],
      required: true,
    },
    fatherName: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    hostel: {
      type: String,
    },
    roomNo: {
      type: String,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
