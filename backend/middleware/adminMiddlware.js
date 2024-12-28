import Room from '../models/Room.js';
import Booking from '../models/Booking.js';
import Accommodation from '../models/Accommodation.js';
import User from '../models/User.js';

export const checkUserBlocked = async (req, res, next) => {
    try {
        const userId = req.user?.id || req.body.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.isBlocked) {
            return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
        }

        next(); // Proceed if not blocked
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
export const checkUserBlockedOnLogin = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.isBlocked) {
            return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
        }

        // Attach user to request object for further processing
        req.user = user;

        next(); // Proceed to the next middleware/controller
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
export const checkAccommodationBlocked = async (req, res, next) => {
    try {
        const accommodationId = req.params.accommodationId || req.body.accommodationId;

        if (!accommodationId) {
            return res.status(400).json({ message: 'Accommodation ID is required.' });
        }

        const accommodation = await Accommodation.findById(accommodationId);
        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found.' });
        }

        if (accommodation.isBlocked) {
            return res.status(403).json({ message: 'This accommodation is blocked and cannot be accessed.' });
        }

        next(); // Proceed if not blocked
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

export const checkBookingBlocked = async (req, res, next) => {
    try {
        const bookingId = req.params.bookingId || req.body.bookingId;

        if (!bookingId) {
            return res.status(400).json({ message: 'Booking ID is required.' });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        if (booking.isBlocked) {
            return res.status(403).json({ message: 'This booking is blocked and cannot be accessed.' });
        }

        next(); // Proceed if not blocked
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

export const checkRoomBlocked = async (req, res, next) => {
    try {
        const roomId = req.params.roomId || req.body.roomId;

        if (!roomId) {
            return res.status(400).json({ message: 'Room ID is required.' });
        }

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found.' });
        }

        if (room.isBlocked) {
            return res.status(403).json({ message: 'This room is blocked and cannot be accessed.' });
        }

        next(); // Proceed if not blocked
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
