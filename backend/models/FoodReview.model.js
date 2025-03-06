import mongoose from "mongoose";

const FoodReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  day: {
    type: String,
    required: true,
  },
  mealType: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner"],
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
  },
});

export const FoodReview = mongoose.model("FoodReview", FoodReviewSchema);
