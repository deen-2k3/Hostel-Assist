import mongoose from "mongoose";

const ApplicationSchema=new mongoose.Schema({
   complaint:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Complaint",
        required:true
   },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
},{timestamps:true});

export const Application=mongoose.model('Application',ApplicationSchema);