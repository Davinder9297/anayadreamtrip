import express from 'express';
import { cancelBooking, getAccommodationById, getAllAccommodations, getAllBookings, getAllRooms, getAllUsers, getBookingById, getRoomById, getUserById, toggleAccommodationBlock, toggleRoomBlock, toggleUserBlock } from '../controllers/adminController.js';
import { adminOnly } from '../middleware/authMiddleware.js';


const router = express.Router();

// User Management
router.get('/users', adminOnly, getAllUsers);
router.get('/users/:userId', adminOnly, getUserById);
router.patch('/users/:userId/block', adminOnly, toggleUserBlock);

// Accommodation Management
router.get('/accommodations', adminOnly, getAllAccommodations);
router.get('/accommodations/:accommodationId', adminOnly, getAccommodationById);
router.patch('/accommodations/:accommodationId/block', adminOnly, toggleAccommodationBlock);

// Room Management
router.get('/rooms', adminOnly, getAllRooms);
router.get('/rooms/:roomId', adminOnly, getRoomById);
router.patch('/rooms/:roomId/block', adminOnly, toggleRoomBlock);

router.get('/bookings', adminOnly, getAllBookings); // View all bookings
router.get('/bookings/:bookingId', adminOnly, getBookingById); // View a specific booking
router.patch('/bookings/:bookingId/cancel', adminOnly, cancelBooking);

export default router;
