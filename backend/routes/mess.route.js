import express from "express";
import { getMessMenu, updateMenu, submitReview, foodComplaint } from "../controllers/mess.controller.js";

const router = express.Router();

router.get("/menu", getMessMenu);
router.post("/menu", updateMenu);
router.post("/review", submitReview);
router.post("/complaint", foodComplaint);

export default router;
