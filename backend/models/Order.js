import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    accommodation: { type: mongoose.Schema.Types.ObjectId, ref: 'Accommodation', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }, // Room from which the order was placed
    items: [
        {
            menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
            quantity: { type: Number, required: true },
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['Pending', 'Preparing', 'Delivered', 'Cancelled'], 
        default: 'Pending' 
    },
    cancelledBy: { 
        type: String, 
        enum: ['Customer', 'Manager', null], 
        default: null 
    }, // Tracks who cancelled the order
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
