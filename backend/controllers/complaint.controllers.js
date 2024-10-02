import { Complaint } from "../models/complaint.model.js"; // Adjust the path as necessary
import { User } from "../models/user.model.js";
import { Application } from "../models/complaintApplication.model.js";

// Create a new complaint
export const createComplaint = async (req, res) => {
  try {
    const { issue } = req.body;

    // Validate the issue field
    if (!issue) {
      return res.status(400).json({
        message: "Issue field is missing.",
        success: false,
      });
    }

    // Find the user (applicant) who is filing the complaint
    const applicant = await User.findById(req.user._id); // Assuming req.user._id holds the authenticated user's ID

    if (!applicant) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Create a new complaint
    const complaint = await Complaint.create({
      issue,
      Applicant: applicant._id, // Link the complaint to the user's ID
    });

    // Create a new application linked to the complaint
    const application = await Application.create({
      complaint: complaint._id, // Correct field name to link the complaint
      status: "pending", // Default status
    });

    return res.status(201).json({
      message: "New complaint created successfully.",
      complaint,
      application, // Optionally return the created application
      success: true,
    });
  } catch (error) {
    console.error("Error creating complaint:", error);
    return res.status(500).json({
      message: "Error creating complaint",
      error: error.message || error, // Include error message for better debugging
    });
  }
};
