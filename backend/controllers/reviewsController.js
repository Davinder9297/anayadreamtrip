import Accommodation from "../models/Accommodation.js";

export const addReview = async (req, res) => {
    try {
        const { rating, comment,accommodationId } = req.body;

        // Validate input
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
        }
        if (!comment) {
            return res.status(400).json({ message: 'Comment is required.' });
        }

        // Find accommodation by ID
        const accommodation = await Accommodation.findById(accommodationId);
        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found.' });
        }

        // Check if the user has already reviewed
        const existingReview = accommodation.reviews.find(
            (review) => review.user.toString() === req.user.id
        );
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this accommodation.' });
        }

        // Add the new review
        const newReview = {
            user: req.user.id,
            rating,
            comment,
        };
        accommodation.reviews.push(newReview);

        // Update the overall rating
        const totalRatings = accommodation.reviews.reduce((acc, review) => acc + review.rating, 0);
        accommodation.rating = (totalRatings / accommodation.reviews.length).toFixed(1);

        await accommodation.save();

        res.status(201).json({
            message: 'Review added successfully.',
            review: newReview,
            overallRating: accommodation.rating,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
export const addManagerReply = async (req, res) => {
    try {
        const { message,accommodationId, reviewId } = req.body;

        // Validate input
        if (!message) {
            return res.status(400).json({ message: 'Reply message is required.' });
        }

        // Find accommodation by ID
        const accommodation = await Accommodation.findById(accommodationId);
        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found.' });
        }

        // Verify the manager is authorized
        if (accommodation.manager.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to reply to this accommodation.' });
        }

        // Find the review by ID
        const review = accommodation.reviews.id(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found.' });
        }

        // Add or update the manager's response
        review.managerResponse = {
            message,
            repliedAt: new Date(),
        };

        await accommodation.save();

        res.status(200).json({
            message: 'Reply added successfully.',
            reply: review.managerResponse,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};