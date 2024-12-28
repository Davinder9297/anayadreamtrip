import Room from '../models/Room.js';
import Accommodation from '../models/Accommodation.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';

export const getAllBookings = async (req, res) => {
    try {
        const { status, userId } = req.query;

        // Query object for filtering
        const query = {};
        if (status) query.status = status; // Filter by status (e.g., "Confirmed", "Cancelled")
        if (userId) query.user = userId;  // Filter by a specific user

        const bookings = await Booking.find(query)
            .populate('user', 'name email')
            .populate('accommodation', 'name location')
            .populate('room', 'roomNumber type');

        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
export const getBookingById = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId)
            .populate('user', 'name email')
            .populate('accommodation', 'name location')
            .populate('room', 'roomNumber type');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        res.status(200).json({ booking });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        // Check if the booking is already cancelled
        if (booking.status === 'Cancelled') {
            return res.status(400).json({ message: 'Booking is already cancelled.' });
        }

        // Update booking status
        booking.status = 'Cancelled';
        booking.isCancelled = true; // Assuming `isCancelled` is a field in the schema
        booking.cancelledBy = 'Admin'; // Optional tracking of who cancelled the booking

        await booking.save();

        res.status(200).json({ message: 'Booking cancelled successfully.', booking });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Get all users (Admin-only access)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude sensitive data
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Get a single user by ID (Admin-only access)
export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found.' });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Block or Unblock a user (Admin-only access)
export const toggleUserBlock = async (req, res) => {
    try {
        const { userId } = req.params;
        const { isBlocked } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        user.isBlocked = isBlocked; // Update block status
        await user.save();

        const statusMessage = isBlocked ? 'blocked' : 'unblocked';
        res.status(200).json({ message: `User ${statusMessage} successfully.` });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Get all accommodations (Admin-only access)
export const getAllAccommodations = async (req, res) => {
    try {
        const accommodations = await Accommodation.find().populate('manager', 'name email');
        res.status(200).json({ accommodations });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Get a single accommodation by ID (Admin-only access)
export const getAccommodationById = async (req, res) => {
    try {
        const { accommodationId } = req.params;
        const accommodation = await Accommodation.findById(accommodationId).populate('manager', 'name email');
        if (!accommodation) return res.status(404).json({ message: 'Accommodation not found.' });
        res.status(200).json({ accommodation });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Block or Unblock an accommodation (Admin-only access)
export const toggleAccommodationBlock = async (req, res) => {
    try {
        const { accommodationId } = req.params;
        const { isBlocked } = req.body;

        const accommodation = await Accommodation.findById(accommodationId);
        if (!accommodation) return res.status(404).json({ message: 'Accommodation not found.' });

        accommodation.isBlocked = isBlocked; // Update block status
        await accommodation.save();

        const statusMessage = isBlocked ? 'blocked' : 'unblocked';
        res.status(200).json({ message: `Accommodation ${statusMessage} successfully.` });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Get all rooms (Admin-only access)
export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('accommodation', 'name location');
        res.status(200).json({ rooms });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Get a single room by ID (Admin-only access)
export const getRoomById = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await Room.findById(roomId).populate('accommodation', 'name location');
        if (!room) return res.status(404).json({ message: 'Room not found.' });
        res.status(200).json({ room });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Block or Unblock a room (Admin-only access)
export const toggleRoomBlock = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { isBlocked } = req.body;

        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: 'Room not found.' });

        room.isBlocked = isBlocked; // Update block status
        await room.save();

        const statusMessage = isBlocked ? 'blocked' : 'unblocked';
        res.status(200).json({ message: `Room ${statusMessage} successfully.` });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

