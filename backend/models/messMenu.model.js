import mongoose from "mongoose";

const MessMenuSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  breakfast: {
    type:String,

  },
  lunch: {
    type:String,
  },

  dinner: {
    type:String,
  },
  specialItem: {
    type:String
  },
});

export const MessMenu = mongoose.model("MessMenu", MessMenuSchema);
