import { Complaint } from '../models/complaint.model.js';  // Adjust the path as necessary
import  {User} from '../models/user.model.js';
// Controller to handle Complaint login

// Create a new complaint
export const createComplaint = async (req, res) => {
    try {
        const {issue} = req.body;

        // Create a new complaint instance
       if(!issue){
        return res.status(400).json({
            message:"Something is missing.",
            success:false
        })
       }
       const applicant=await User.find().populate('User','fullname Hostel roomNo');
  const complaint=await Complaint.create({
    issue,
     applicant
  });
  return res.status(201).json({
    message:"New complaint created successfully.",
    complaint,
    success:true
  })
    } catch (error) {
        return res.status(500).json({ message: 'Error creating complaint', error });
    }
}
