import express from "express";
import { lostItem, foundItem } from "../controllers/LostFound.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"; // Assuming you are using authentication middleware

const router = express.Router();

router.post("/lostItem", lostItem);
router.post("/foundItem", foundItem, isAuthenticated);
export default router;
