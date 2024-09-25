import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    issue: {
      type: String,
      required:true
    },
    Applicant: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'UserDetails',
      required: true,
    },
  
  },
  { timestamps: true }
);

export const Complaint = mongoose.model("Complaint", complaintSchema);
