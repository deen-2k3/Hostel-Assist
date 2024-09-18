import express from "express";
import {login,logout,register,todayApplications} from "../controllers/user.controller.js";

const router =express.Router();

router.route("/register").post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/getApplicatoins').get(todayApplications);

export default router;