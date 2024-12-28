import express from 'express';
import { 
  createRoom, 
  getAllRoomsByAccommodation, 
  getRoomById, 
  updateRoom, 
  deleteRoom 
} from '../controllers/roomController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import roomupload from '../middleware/roommedia.js';
import { checkAccommodationBlocked, checkRoomBlocked } from '../middleware/adminMiddlware.js';

const router = express.Router();

// Route to create a new room (with image upload)
router.post('/',checkAccommodationBlocked, authenticate, authorize('manager'), roomupload, createRoom);

// Route to get all rooms of a specific accommodation (for users)
router.get('/accommodation/:accommodationId',checkAccommodationBlocked, getAllRoomsByAccommodation);

// Route to get details of a specific room (for users)
router.get('/:roomId', getRoomById);

// Route to update room details (with image upload)
router.put('/:roomId',checkRoomBlocked, authenticate, authorize('manager'), roomupload, updateRoom);

// Route to delete a room (for hotel managers)
router.delete('/:roomId', authenticate, authorize('manager'), deleteRoom);

export default router;
