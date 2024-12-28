import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import accommodationRoutes from './routes/accommodationRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import managerRoutes from './routes/managerRoutes.js';
import reviewsRoutes from './routes/reviewsRoutes.js';
import foodOrderRoutes from './routes/foodOrderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

connectDB();

app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api', bookingRoutes);
app.use('/api', managerRoutes);
app.use('/api', reviewsRoutes);
app.use('/api', foodOrderRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
