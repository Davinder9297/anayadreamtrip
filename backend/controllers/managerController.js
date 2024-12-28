import Accommodation from "../models/Accommodation.js";
import Booking from "../models/Booking.js";


  export const checkIn = async (req, res) => {
    try {
      const { bookingId } = req.body;
  
      if (!bookingId) {
        return res.status(400).json({ message: 'Booking ID is required' });
      }
  
      const booking = await Booking.findById(bookingId);
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      if (booking.isCheckedIn) {
        return res.status(400).json({ message: 'Already checked in' });
      }
  
      if (booking.status !== 'Confirmed') {
        return res.status(400).json({ message: 'Booking must be confirmed before check-in' });
      }
  
      // Update the booking for check-in
      booking.isCheckedIn = true;
      booking.checkInTime = new Date();
  
      await booking.save();
  
      res.status(200).json({ message: 'Check-in successful', booking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  export const checkOut = async (req, res) => {
    try {
      const { bookingId } = req.body;
  
      if (!bookingId) {
        return res.status(400).json({ message: 'Booking ID is required' });
      }
  
      const booking = await Booking.findById(bookingId);
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      if (!booking.isCheckedIn) {
        return res.status(400).json({ message: 'Cannot check out without checking in first' });
      }
  
      if (booking.isCheckedOut) {
        return res.status(400).json({ message: 'Already checked out' });
      }
  
      // Update the booking for check-out
      booking.isCheckedOut = true;
      booking.checkOutTime = new Date();
  
      await booking.save();
  
      res.status(200).json({ message: 'Check-out successful', booking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  export const getDashboardData = async (req, res) => {
    try {
      // const { managerId } = req.params; // Manager ID is passed as a parameter
  let managerId=req.user.id;
      // Fetch accommodations managed by the manager
      const accommodations = await Accommodation.find({ manager: managerId }).populate('rooms');
      const accommodationIds = accommodations.map(acc => acc._id); // Extract IDs of accommodations
  
      // Fetch bookings associated with the manager's accommodations
      const bookings = await Booking.find({ accommodationId: { $in: accommodationIds } });
  
      // Calculate dashboard statistics
      const totalBookings = bookings.length;
      const pendingBookings = bookings.filter(booking => booking.status === 'Pending').length;
      const confirmedBookings = bookings.filter(booking => booking.status === 'Confirmed').length;
      const checkedInGuests = bookings.filter(booking => booking.status === 'Checked-In').length;
      const checkedOutGuests = bookings.filter(booking => booking.status === 'Checked-Out').length;
  
      // Total number of accommodations
      const totalAccommodations = accommodations.length;
  
      // Accommodation-wise rooms
      const accommodationWiseRooms = accommodations.map(acc => ({
        accommodationName: acc.name,
        totalRooms: acc.rooms.length,
        roomDetails: acc.rooms.map(room => ({
          roomNumber: room.roomNumber,
          type: room.type,
          price: room.price,
          availability: room.availability,
        })),
      }));
  
      // Send response
      res.status(200).json({
        totalBookings,
        pendingBookings,
        confirmedBookings,
        checkedInGuests,
        checkedOutGuests,
        totalAccommodations,
        accommodationWiseRooms,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  export const changeAccommodationStatus = async (req, res) => {
    try {
      const { accommodationId } = req.body; // Accommodation ID from the route
      const { isActive } = req.body; // New status from the request body
  // console.log(req.body);
  
      // Validate the isActive value
      if (typeof isActive !== 'boolean') {
        return res.status(400).json({ message: 'isActive must be a boolean value.' });
      }
  
      // Find the accommodation by ID
      const accommodation = await Accommodation.findById(accommodationId);
  
      if (!accommodation) {
        return res.status(404).json({ message: 'Accommodation not found.' });
      }
  
      // Check if the authenticated user is the manager of this accommodation
      if (accommodation.manager.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to change the status of this accommodation.' });
      }
  
      // Update the active status
      accommodation.isActive = isActive;
      await accommodation.save();
  
      res.status(200).json({
        message: `Accommodation status updated successfully to ${isActive ? 'active' : 'inactive'}.`,
        accommodation,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };