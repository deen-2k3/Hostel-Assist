import express from 'express';
import { getApplicants, updateStatus } from '../controllers/complaintApplication.controllers.js';  // Adjust the path if necessary
import isAuthenticated from '../middlewares/isAuthenticated.js';  // Assuming you are using authentication middleware

const router = express.Router();

// Route to get all applications with associated complaints
router.get('/applications',getApplicants);

// Route to update the status of an application by its ID
router.put('/applications/:id', isAuthenticated, updateStatus);

export default router;
