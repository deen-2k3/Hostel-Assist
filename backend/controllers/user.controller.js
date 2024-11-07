import express, { application } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Complaint } from "../models/complaint.model.js";

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

    const token = await jwt.sign(
      { userId: user._id, name: user.fullname,role:user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .cookie("userId", user._id.toString(), {
        // Set userId cookie here
        maxAge: 1 * 24 * 60 * 60 * 1000, // Same expiration time
        httpOnly: false, // Consider using httpOnly for security
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${(user.fullname, user.id)}`,
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
    const userId = req.user._id;
    const { fatherName, phoneNumber, hostel, roomNo } = req.body;

    // Handle the profile photo if it exists
    let profilePhotoUrl;
    if (req.file) {
      // Assuming you're uploading the file and saving its URL
      profilePhotoUrl = req.file.path;
      console.log(profilePhotoUrl); // Adjust this according to your storage strategy
    }

    // Update user details in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fatherName,
        phoneNumber,
        hostel,
        roomNo,
        profilePhoto: profilePhotoUrl, // Update photo if it exists
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
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
    const userId = req.user._id;
    const user = await User.findById(userId); // Fetch user by ID
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.json(user); // Send user data as response
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const checkAuth = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Optionally verify token and respond with user info
    return res.status(200).json({
      isAuthenticated: true,
      userName: decoded.name, // Assuming name is part of the token payload
      userId: decoded.userId,
      role:decoded.role,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "Invalid token" });
  }
};
