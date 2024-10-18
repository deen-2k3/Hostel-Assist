import express from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  todayApplications,
  UserDetails,
  GetUserDetails,
  checkAuth,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/checkAuth").get(checkAuth);
router.route("/logout").get(logout);
router.put(
  "/update/:userId",
  upload.single("profilePhoto"),
  isAuthenticated,
  UserDetails
);

router.route("/getApplicatoins").get(todayApplications);
router.route("/forgot").put(forgotPassword);
router.route("/profile").get(isAuthenticated, GetUserDetails); // Use isAuthenticated middleware for protection

export default router;
