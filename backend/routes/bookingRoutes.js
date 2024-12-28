import express from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  getUserBookings,
  getDateWiseBookings,
  cancelBookingByUser,
  cancelBookingByManager,
  confirmBookingByManager,
} from '../controllers/bookingController.js';
import { authenticate, isManager } from '../middleware/authMiddleware.js';
import checkActiveAccommodation from '../middleware/activestatusMiddleware.js';
import {checkAccommodationBlocked, checkRoomBlocked} from '../middleware/adminMiddlware.js'
const router = express.Router();

// Create a new booking
router.post('/bookings',checkAccommodationBlocked,checkRoomBlocked,checkActiveAccommodation, authenticate, createBooking); // Added `protect` middleware to secure booking creation

// Cancel a booking by user
router.put('/cancel/:bookingId/user', authenticate, cancelBookingByUser);

// Cancel a booking by manager
router.put('/cancel/:bookingId/manager', authenticate, isManager, cancelBookingByManager);

// Get all bookings (accessible only to authenticated users)

// Get booking by ID (accessible only to authenticated users)
router.get('/bookings/:bookingId', authenticate, getBookingById);

// Get bookings for a specific user (only accessible by that user or an admin/manager)
router.get('/bookings/user/:userId', authenticate, getUserBookings);

// Get bookings within a date range (for authenticated users like managers or admins)
router.post('/bookings/date-range',authenticate,  getDateWiseBookings);
router.post('/allbookings',authenticate,  getAllBookings);
router.put('/confirm/:bookingId/manager',checkAccommodationBlocked,checkRoomBlocked, authenticate, isManager, confirmBookingByManager);

export default router;
