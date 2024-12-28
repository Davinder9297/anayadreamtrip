import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { addManagerReply, addReview } from '../controllers/reviewsController.js';

const router = express.Router();

// POST route for adding a review
router.post('/accommodations/reviews', authenticate, addReview);
router.patch('/accommodations/reviews/reply', authenticate, addManagerReply);

export default router;
