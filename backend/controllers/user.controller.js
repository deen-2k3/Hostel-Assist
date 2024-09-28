import express, { application } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Complaint } from "../models/complaint.model.js";
import cloudinary from "../config/cloudinary.js"; // Adjust the path if necessary

export const register = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    if (!fullname || !email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      password: hashPassword,
      role,
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }
    const tokenDate = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenDate, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      FatherName: user.FatherName,
      Quid: user.id,
      PhoneNumber: user.PhoneNumber,
      Hostel: user.Hostel,
      RoomNo: user.RoomNo,
      role: user.role,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Something is missing",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const newPassword = await bcrypt.hash(confirmPassword, 10);
    user.password = newPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const UserDetails = async (req, res) => {
  try {
    const { fatherName, phoneNumber, hostel, roomNo } = req.body; // Standardized field names
    const profilePhoto = req.file ? req.file.path : null; // Check if a file is uploaded

    // Validate required fields
    if (!fatherName || !phoneNumber || !hostel || !roomNo) {
      return res.status(400).json({
        message: "Required fields are missing: Father Name, Phone Number, Hostel, Room No.",
        success: false,
      });
    }

    // Optional: Validate phone number format (assuming 10 digits here)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        message: "Invalid phone number format. It should be 10 digits.",
        success: false,
      });
    }

    // Update user details
    const updateDetails = await User.findByIdAndUpdate(
      req.params.userId, // Fetching the user ID from route parameters
      {
        fatherName,
        phoneNumber,
        hostel,
        roomNo,
        profilePhoto,
      },
      { new: true } // Return the updated document
    );

    // If no user found, return an error
    if (!updateDetails) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Success response
    return res.status(200).json({
      message: "User details updated successfully.",
      user: updateDetails,
      success: true,
    });

  } catch (error) {
    console.error("Error updating user details: ", error);
    return res.status(500).json({
      message: "An error occurred while updating user details.",
      success: false,
      error: error.message,
    });
  }
};


export const todayApplications = async (req, res) => {
  try {
    const startofDay = new Date();
    startofDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const applications = await Complaint.find({
      createdAt: { $gte: startofDay, $lte: endOfDay },
    });
    res.json(applications);
  } catch (error) {
    console.log(error);
  }
};

export const GetUserDetails = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: true,
      });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
