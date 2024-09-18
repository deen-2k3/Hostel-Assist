import { Complaint } from '../models/complaint.model.js';  // Adjust the path as necessary

// Controller to handle Complaint login

// Create a new complaint
export const createComplaint = async (req, res) => {
    try {
        const { issue, Hostel, roomNo } = req.body;

        // Create a new complaint instance
       if(!issue||!Hostel||!roomNo){
        return res.status(400).json({
            message:"Something is missing.",
            success:false
        })
       }
  const complaint=await Complaint.create({
    issue,

    Hostel,
    roomNo
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
         // Delete a complaint by ID
            // export const  deleteComplaint= async (req, res) => {
            //     try {
            //         const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);

            //         if (!deletedComplaint) {
            //             return res.status(404).json({ message: 'Complaint not found' });
            //         }

            //         return res.status(200).json({ message: 'Complaint deleted successfully' });
            //     } catch (error) {
            //         return res.status(500).json({ message: 'Error deleting complaint', error });
            //     }
            // }




