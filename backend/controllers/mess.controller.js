import { MessMenu } from "../models/messMenu.model.js";
import { FoodReview } from "../models/FoodReview.model.js";
import { FoodComplaint } from "../models/FoodComplaint.js";

// ✅ Get Weekly Mess Menu
export const getMessMenu = async (req, res) => {
  try {
    const menu = await MessMenu.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu", error });
  }
};

// ✅ Add or Update Menu
export const updateMenu = async (req, res) => {
  try {
    const { day, breakfast, lunch, dinner, specialItem } = req.body;
    const updatedMenu = await MessMenu.findOneAndUpdate(
      { day },
      { breakfast, lunch, dinner, specialItem },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(500).json({ message: "Error updating menu", error });
  }
};

// ✅ Submit Food Review
export const submitReview = async (req, res) => {
  try {
    const { user, day, mealType, rating, comment } = req.body;
    const review = new FoodReview({ user, day, mealType, rating, comment });
    await review.save();
    res.status(201).json({ message: "Review submitted", review });
  } catch (error) {
    res.status(500).json({ message: "Error submitting review", error });
  }
};

// ✅ File a Complaint
export const foodComplaint = async (req, res) => {
  try {
    const { user, complaintType, description } = req.body;
    const complaint = new FoodComplaint({ user, complaintType, description });
    await complaint.save();
    res.status(201).json({ message: "Complaint filed", complaint });
  } catch (error) {
    res.status(500).json({ message: "Error filing complaint", error });
  }
};
