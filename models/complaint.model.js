import mongoose  from "mongoose";

const complaintSchema= new mongoose.Schema({
    issue:{
        type:String,
        required:true
    },
    Hostel:{
        type:String,
        // type:mongoose.Schema.Types.ObjectId,
        // ref:'User',
        required:true
    },
    roomNo:{
        type:String,
        // type:mongoose.Schema.Types.ObjectId,
        // ref:'User',
        required:true
    }
});

export const Complaint =mongoose.model('Complaint',complaintSchema);