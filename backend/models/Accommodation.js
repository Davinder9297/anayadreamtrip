import mongoose from 'mongoose';
const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    managerResponse: {
        message: { type: String },
        repliedAt: { type: Date },
    },
});
const AccommodationSchema = new mongoose.Schema({
    type: { type: String, enum: ['Hotel', 'Resort'], required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    amenities: [{ type: String }],
    image: [{ type: String }],
    photos: [{ type: String }],
    isBlocked: { type: Boolean, default: false },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
    rating: { type: Number, default: 0 },
    reviews: [ReviewSchema],
    checkInTime: { type: String, required: true }, // E.g., '14:00' for 2 PM
    checkOutTime: { type: String, required: true }, // E.g., '12:00' for 12 PM
    isActive: { type: Boolean, default: true }, // Indicates if the accommodation is active
});

export default mongoose.model('Accommodation', AccommodationSchema);
