import mongoose from "mongoose";
import Room from "./Room.js";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accommodationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Accommodation', required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  status: { type: String, enum: ['Confirmed', 'Canceled','Pending','Checked-In','Checked-Out'], default: 'Pending' }, // Track booking status
  canceledAt: { type: Date }, // Track the cancellation date
  canceledBy: { type: String, enum: ['User', 'Manager','Admin'] },

  isCheckedIn: { type: Boolean, default: false },
  checkInTime: { type: Date },
  isCheckedOut: { type: Boolean, default: false },
  checkOutTime: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update `updatedAt` field on document update
bookingSchema.pre('updateOne', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});
bookingSchema.pre('save', async function (next) {
  const booking = this;
  const room = await Room.findById(booking.roomId);
  
  if (booking.isModified('status')) {
    if (booking.status === 'Confirmed') {
      // Mark the room as unavailable when the booking is confirmed
      room.availability = false;
    } else if (booking.status === 'Canceled') {
      // Mark the room as available when the booking is canceled
      room.availability = true;
    }

    await room.save();  // Save the updated room status
  }

  next();
});

export default mongoose.model('Booking', bookingSchema);
