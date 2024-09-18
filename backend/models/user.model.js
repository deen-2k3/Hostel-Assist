import mongoose from "mongoose";
const userSchema =new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    FatherName:{
        type:String,
        required:true,
    },
    Quid:{
        type:Number,
        required:true
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    Hostel:{
        type:String,
        required:true,
    },
    roomNo:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','warden'],
        required:true
    },
    profilePhoto:{
        type:String,
        default:""
    }

},{timestamps:true});

export const User=mongoose.model('User',userSchema);