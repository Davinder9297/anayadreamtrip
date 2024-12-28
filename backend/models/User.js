import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['user', 'manager', 'admin'], default: 'user' },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  panNumber: { type: String },  // Store PAN number
  aadhaarNumber: { type: String },  // Store Aadhaar number
  panImage: { type: String },  // Store PAN image URL
  aadhaarImage: { type: String },  // Store Aadhaar image URL
  isBlocked: { type: Boolean, default: false },
  // New fields for manager approval process
  isVerified: { type: Boolean, default: false },  // Whether the manager is verified by admin
  adminResponse: { type: String, default: '' },  // Admin's response (reason for decline)
  isDeclined: { type: Boolean, default: false },  // Whether the manager's registration was declined
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('User', UserSchema);
