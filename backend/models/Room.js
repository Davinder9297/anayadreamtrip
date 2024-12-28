import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },  // Room number (e.g., '101', 'A1')
  accommodationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Accommodation', required: true },
  type: { type: String, enum: ['Single', 'Double', 'Suite', 'Deluxe'], required: true },
  price: { type: Number, required: true },
  features: [String], // E.g., ['WiFi', 'AC', 'Breakfast included']
  description: { type: String, required: true }, // Description of the room
  capacity: { type: Number, required: true }, // Number of people the room can accommodate
  isBlocked: { type: Boolean, default: false },

  // Main image of the room (only one)
  mainImage: { type: String, required: true },  // URL for the main image

  // Additional images of the room (multiple photos)
  photos: [{ type: String }], // Array of image URLs

  availability: { type: Boolean, default: true }, // For quick checks (whether the room is available or not)

  bookings: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Booking' 
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Index for quick search by accommodationId (useful for querying rooms by accommodation)
roomSchema.index({ accommodationId: 1 });

// Middleware to update `updatedAt` field on document update
roomSchema.pre('updateOne', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

// Method to check if a room is available for a given date range
roomSchema.methods.isAvailable = function(startDate, endDate) {
  // Check if any booking overlaps with the given date range
  for (let booking of this.bookings) {
    if (
      (startDate >= booking.startDate && startDate <= booking.endDate) ||
      (endDate >= booking.startDate && endDate <= booking.endDate) ||
      (startDate <= booking.startDate && endDate >= booking.endDate)
    ) {
      return false; // Room is not available
    }
  }
  return true; // Room is available
};

export default mongoose.model('Room', roomSchema);
