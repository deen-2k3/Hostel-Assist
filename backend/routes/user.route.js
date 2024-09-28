import express from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  todayApplications,
  UserDetails,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/update/:userId")
  .put(upload.single("profilePhoto"), isAuthenticated, UserDetails);
router.route("/getApplicatoins").get(todayApplications);
router.route("/forgot").put(forgotPassword);

export default router;
