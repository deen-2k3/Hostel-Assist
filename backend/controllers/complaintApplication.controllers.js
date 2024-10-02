import { Application } from "../models/complaintApplication.model.js";
import { Complaint } from "../models/complaint.model.js";

// Get all applications with associated complaints
export const getApplicants = async (req, res) => {
  try {
    const applications = await Application.find().populate({
      path: "complaint",
      options: { sort: { createdAt: -1 } },
      select: "issue",
      populate: {
        path: "Applicant", // Assuming 'Applicant' is the ref field in Complaint model
        select: "fullname Hostel roomNo", // Select necessary fields from User model
      },
    });

    // No need to save the applications, just check if there are any
    if (!applications.length) {
      return res.status(404).json({
        message: "Applications not found.",
        success: false,
      });
    }

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error retrieving applications.",
      error,
    });
  }
};

// Update application status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required.",
        success: false,
      });
    }

    // Find the application by its ID
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    // Update the status and save the application
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error updating status.",
      error,
    });
  }
};
