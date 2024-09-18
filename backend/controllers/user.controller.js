import express, { application } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Complaint } from "../models/complaint.model.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, FatherName, Quid, PhoneNumber, Hostel, roomNo, password, role,profilePhoto} = req.body;

        if (!fullname || !email || !FatherName || !Quid || !PhoneNumber || !Hostel || !roomNo || !password || !role||!profilePhoto) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        };
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email.",
                success: false,
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            FatherName,
            Quid,
            PhoneNumber,
            Hostel,
            roomNo,
            password: hashPassword,
            role,
            profilePhoto

        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };
    const tokenDate={
        userId:user._id
    }
    const token =await jwt.sign(tokenDate,process.env.SECRET_KEY,{expiresIn:'1d'});

    user={
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        FatherName:user.FatherName,
        Quid:user.id,
        PhoneNumber:user.PhoneNumber,
        Hostel:user.Hostel,
        RoomNo:user.RoomNo,
        role:user.role
    }
    return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
        message:`Welcome back ${user.fullname}`,
        user,
        success:true
    });
    }catch(error)
    {
    console.log(error)
    }
}
export const logout =async(req,res)=>{
    try {
         return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
         })
    } catch (error) {
        console.log(error);
    }
}
 export const todayApplications=async(req,res)=>{
    try{const startofDay= new Date();
    startofDay.setHours(0,0,0,0);

    const endOfDay=new Date();
    endOfDay.setHours(23,59,59,999);

    const applications=await Complaint.find({
        createdAt:{$gte:startofDay,$lte:endOfDay}
    });
    res.json(applications);
}catch(error){
    console.log(error);
}
}