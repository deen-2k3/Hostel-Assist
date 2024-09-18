import express from 'express';
import {createComplaint} from '../controllers/complaint.controllers.js';  // Adjust the path as necessary
import isAuthenticated from '../middlewares/isAuthenticated.js';
const router = express.Router();

// Define routes and map to controller methods
router.route('/').post (createComplaint);


// router.route('/complaints/:id').delete(isAuthenticated,deleteComplaint);

export default router;
