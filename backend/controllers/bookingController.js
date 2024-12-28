import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import Accommodation from '../models/Accommodation.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { userId, accommodationId, roomId, startDate, endDate, totalAmount, paymentMethod } = req.body;

    // Convert start and end dates to ensure comparison works correctly
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res.status(400).json({ message: 'Start date must be before end date' });
    }

    // Fetch the room details
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // Check if the room is already booked for the given date range
    const existingBooking = await Booking.findOne({
      roomId,
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } }, // Overlapping dates condition
      ],
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Room is already booked for the selected dates' });
    }

    // Create and save the new booking
    const booking = new Booking({
      userId,
      accommodationId,
      roomId,
      startDate,
      endDate,
      paymentStatus: 'Pending',
      totalAmount,
      paymentMethod,
    });
    await booking.save();

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all bookings (For Admin/Manager)
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email') // Populate user details
      .populate('roomId', 'roomNumber type price') // Populate room details
      .populate('accommodationId', 'name location'); // Populate accommodation details

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get bookings for a specific user
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId })
      .populate('accommodationId', 'name location')
      .populate('roomId', 'roomNumber type price')
      .sort({ createdAt: -1 });

    if (!bookings.length) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel a booking by user
export const cancelBookingByUser = async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user._id; // Assume user ID is available in req.user after authentication

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You can only cancel your own bookings' });
    }

    if (booking.status === 'Canceled') {
      return res.status(400).json({ message: 'Booking is already canceled' });
    }

    booking.status = 'Canceled';
    booking.canceledAt = new Date();
    booking.canceledBy = 'User';
    await booking.save();

    const room = await Room.findById(booking.roomId);
    room.availability = true;
    await room.save();

    res.status(200).json({ message: 'Booking canceled successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel a booking by manager
export const cancelBookingByManager = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.user.role !== 'manager') {
      return res.status(403).json({ message: 'You are not authorized to cancel this booking' });
    }

    if (booking.status === 'Canceled') {
      return res.status(400).json({ message: 'Booking is already canceled' });
    }

    booking.status = 'Canceled';
    booking.canceledAt = new Date();
    booking.canceledBy = 'Manager';
    await booking.save();

    const room = await Room.findById(booking.roomId);
    room.availability = true;
    await room.save();

    res.status(200).json({ message: 'Booking canceled successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get bookings for a specific date range
export const getDateWiseBookings = async (req, res) => {
  try {
    const { startDate, endDate, accommodationId } = req.body;

    if (!startDate || !endDate || !accommodationId) {
      return res
        .status(400)
        .json({ message: 'startDate, endDate, and accommodationId are required' });
    }

    // Retrieve managerId from authenticated user
    const managerId = req.user.id;

    // Validate manager's access to the accommodation
    const accommodation = await Accommodation.findOne({
      _id: accommodationId,
      manager:managerId,
    });

    if (!accommodation) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to view bookings for this accommodation' });
    }

    // Fetch bookings within the specified date range
    const bookings = await Booking.find({
      accommodationId,
      startDate: { $gte: new Date(startDate) },
      endDate: { $lte: new Date(endDate) },
    })
      .populate('userId', 'name email')
      .populate('accommodationId', 'name location')
      .populate('roomId', 'roomNumber type price')
      .sort({ startDate: 1 });

    if (!bookings.length) {
      return res.status(404).json({ message: 'No bookings found within the specified dates' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const { accommodationId } = req.body;

    if (!accommodationId) {
      return res.status(400).json({ message: 'accommodationId is required' });
    }

    // Retrieve managerId from authenticated user
    const managerId = req.user.id;

    // Find accommodations managed by the manager
    const accommodation = await Accommodation.findOne({ 
      _id: accommodationId, 
      manager:managerId 
    });

    if (!accommodation) {
      return res.status(403).json({ message: 'Unauthorized to view bookings for this accommodation' });
    }

    // Fetch bookings for the specific accommodation
    const bookings = await Booking.find({ accommodationId })
      .populate('userId', 'name email')
      .populate('accommodationId', 'name location')
      .populate('roomId', 'roomNumber type price');

    if (!bookings.length) {
      return res.status(404).json({ message: 'No bookings found for the specified accommodation' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId).populate('userId accommodationId roomId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    res.status(200).json({ booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const confirmBookingByManager = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Retrieve managerId from authenticated user
    const managerId = req.user.id;

    // Find the booking by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Validate that the manager has access to the accommodation
    const accommodation = await Accommodation.findOne({
      _id: booking.accommodationId,
      manager:managerId,
    });

    if (!accommodation) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to confirm bookings for this accommodation' });
    }

    // Update the booking status to "Confirmed"
    booking.status = 'Confirmed';
    await booking.save();

    res.status(200).json({ message: 'Booking confirmed successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
