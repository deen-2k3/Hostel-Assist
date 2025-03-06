import mongoose from "mongoose";

const FoodComplaintSchema = new mongoose.Schema({
  user: {
     type: mongoose.Schema.Types.ObjectId, 
    ref: "User"
 },
  complaintType: { 
    type: String, 
    enum: ["Hygiene", "Quality", "Quantity", "Other"], 
    required: true 
},
  description: { 
    type: String,
     required: true 
    },
  status: {
     type: String,
      enum: ["Pending", "Resolved"],
       default: "Pending"
     },
});

export const FoodComplaint = mongoose.model("FoodComplaint", FoodComplaintSchema);
