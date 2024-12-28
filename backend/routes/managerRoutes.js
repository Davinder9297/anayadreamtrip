import express from 'express';
import { changeAccommodationStatus, checkIn, checkOut, getDashboardData } from '../controllers/managerController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Securely fetch all bookings for a specific accommodation

router.post('/checkin', checkIn);   // Route for check-in
router.post('/checkout', checkOut);
router.get('/manager/dashboard',authenticate, getDashboardData);
router.put('/accommodationstatus', authenticate, changeAccommodationStatus);
export default router;