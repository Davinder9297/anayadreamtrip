import express from 'express';
import upload from '../middleware/multer.js'; // Import the multer middleware with Cloudinary storage
import {
  addAccommodation,
  getAllAccommodations,
  getAccommodationDetails,
  updateAccommodation,
  deleteAccommodation,
  getUserAccommodations
} from '../controllers/accommodationController.js';
import { checkAccommodationBlocked } from '../middleware/adminMiddlware.js';

const router = express.Router();

// Route to add a new accommodation (only for managers) with image upload
router.post('/', upload, addAccommodation);
router.get('/', getAllAccommodations);

// Route to get details of a specific accommodation by ID
router.get('/:id', getAccommodationDetails);

// Route to update an accommodation (only for managers) with image upload
router.put('/:id',checkAccommodationBlocked, upload, updateAccommodation);
router.delete('/:id', deleteAccommodation);
router.get('/manager/:userId', getUserAccommodations);

export default router;
