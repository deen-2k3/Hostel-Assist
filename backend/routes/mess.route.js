import express from "express";
import { getMessMenu, updateMenu, submitReview, foodComplaint } from "../controllers/mess.controller.js";

const router = express.Router();

router.get("/getmenu", getMessMenu);
router.post("/menu", updateMenu);
router.post("/review", submitReview);
router.post("/foodcomplaint", foodComplaint);

export default router;
