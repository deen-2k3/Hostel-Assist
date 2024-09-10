import mongoose from "mongoose";

const ApplicationSchema=new mongoose.Schema({
    issue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Complaint',
        require:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        types:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
},{timestamps:true});

export const Application=mongoose.model('Application',ApplicationSchema);